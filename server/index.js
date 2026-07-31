import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { roomManager } from './rooms.js';
import { quizStore } from './quizStore.js';
import { authStore } from './auth.js';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// REST API endpoints for quick queries or imports
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/quizzes', (req, res) => {
  res.json(quizStore.getAll());
});

// Helper to broadcast full room state to host and players
function broadcastRoomState(roomCode) {
  const room = roomManager.getRoom(roomCode);
  if (!room) return;

  roomManager.updateRankings(room);
  const playerList = Array.from(room.players.values());

  // Data for host
  const hostPayload = {
    code: room.code,
    quizTitle: room.quiz.title,
    state: room.state,
    isLocked: room.isLocked,
    isPaused: room.isPaused,
    settings: room.settings,
    currentQuestionIndex: room.currentQuestionIndex,
    totalQuestions: room.quiz.questions.length,
    currentQuestion: room.quiz.questions[room.currentQuestionIndex],
    players: playerList,
    timerSeconds: room.timerSeconds,
    liveDistribution: roomManager.getLiveDistribution(roomCode)
  };

  // Data for player
  const playerPayload = {
    code: room.code,
    state: room.state,
    currentQuestionIndex: room.currentQuestionIndex,
    totalQuestions: room.quiz.questions.length,
    timerSeconds: room.timerSeconds,
    currentQuestion: room.quiz.questions[room.currentQuestionIndex] ? {
      ...room.quiz.questions[room.currentQuestionIndex],
      // Hide correct answers from player during active question!
      correctAnswer: room.state === 'REVEAL' || room.state === 'LEADERBOARD' || room.state === 'FINISHED' 
        ? room.quiz.questions[room.currentQuestionIndex].correctAnswer 
        : undefined,
      correctAnswers: room.state === 'REVEAL' || room.state === 'LEADERBOARD' || room.state === 'FINISHED'
        ? room.quiz.questions[room.currentQuestionIndex].correctAnswers 
        : undefined,
      correctOrder: room.state === 'REVEAL' || room.state === 'LEADERBOARD' || room.state === 'FINISHED'
        ? room.quiz.questions[room.currentQuestionIndex].correctOrder 
        : undefined
    } : null,
    rankings: playerList.map(p => ({
      nickname: p.nickname,
      score: p.score,
      rank: p.rank,
      prevRank: p.prevRank,
      streak: p.streak,
      isHost: p.isHost
    }))
  };

  io.to(`host:${room.code}`).emit('room-state-update', hostPayload);
  io.to(`room:${room.code}`).emit('player-room-update', playerPayload);
}

// Timer Controller for Question Round
function startQuestionTimer(roomCode) {
  const room = roomManager.getRoom(roomCode);
  if (!room) return;

  if (room.timerInterval) {
    clearInterval(room.timerInterval);
  }

  const question = room.quiz.questions[room.currentQuestionIndex];
  if (!question) return;

  room.timerSeconds = question.timeLimit || 20;
  room.isPaused = false;

  io.to(`room:${room.code}`).emit('question-start', {
    questionIndex: room.currentQuestionIndex,
    timeLimit: room.timerSeconds
  });

  broadcastRoomState(roomCode);

  room.timerInterval = setInterval(() => {
    if (room.isPaused) return;

    room.timerSeconds--;
    io.to(`room:${room.code}`).emit('timer-tick', { seconds: room.timerSeconds });
    io.to(`host:${room.code}`).emit('timer-tick', { seconds: room.timerSeconds });

    if (room.timerSeconds <= 0) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
      room.state = 'REVEAL';
      broadcastRoomState(roomCode);
      io.to(`room:${room.code}`).emit('question-timeup');
    }
  }, 1000);
}

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);

  // Auth events
  socket.on('auth:login', ({ email, password }, callback) => {
    try {
      const user = authStore.login(email, password);
      callback({ success: true, user });
    } catch (err) {
      callback({ success: false, message: err.message });
    }
  });

  socket.on('auth:register', ({ email, password, name }, callback) => {
    try {
      const user = authStore.register(email, password, name);
      callback({ success: true, user });
    } catch (err) {
      callback({ success: false, message: err.message });
    }
  });

  // Quiz Management
  socket.on('quiz:list', (callback) => {
    callback(quizStore.getAll());
  });

  socket.on('quiz:save', (quizData, callback) => {
    try {
      let saved;
      if (quizData.id && quizStore.getById(quizData.id)) {
        saved = quizStore.update(quizData.id, quizData);
      } else {
        saved = quizStore.create(quizData);
      }
      callback({ success: true, quiz: saved });
      io.emit('quiz:updated', quizStore.getAll());
    } catch (err) {
      callback({ success: false, message: err.message });
    }
  });

  socket.on('quiz:delete', (quizId, callback) => {
    const success = quizStore.delete(quizId);
    callback({ success });
    if (success) io.emit('quiz:updated', quizStore.getAll());
  });

  socket.on('quiz:duplicate', (quizId, callback) => {
    const copy = quizStore.duplicate(quizId);
    callback({ success: Boolean(copy), quiz: copy });
    if (copy) io.emit('quiz:updated', quizStore.getAll());
  });

  // Room Creation (Host)
  socket.on('room:create', ({ quizId, quiz: clientQuiz, settings, hostUser }, callback) => {
    try {
      let quiz = (quizId ? quizStore.getById(quizId) : null) || clientQuiz;
      if (!quiz && clientQuiz) quiz = clientQuiz;
      if (!quiz) throw new Error('Quiz data not found.');

      const room = roomManager.createRoom({
        hostSocketId: socket.id,
        hostUser,
        quiz,
        settings
      });

      socket.join(`host:${room.code}`);
      socket.join(`room:${room.code}`);

      callback({ success: true, roomCode: room.code });
      broadcastRoomState(room.code);
    } catch (err) {
      callback({ success: false, message: err.message });
    }
  });

  // Player Joining
  socket.on('room:join', ({ roomCode, nickname }, callback) => {
    try {
      const { room, player } = roomManager.joinRoom(roomCode, nickname, socket.id);
      socket.join(`room:${room.code}`);

      callback({
        success: true,
        playerKey: player.id,
        nickname: player.nickname,
        roomCode: room.code
      });

      // Notify host and room
      io.to(`host:${room.code}`).emit('player-joined', { nickname: player.nickname, total: room.players.size });
      broadcastRoomState(room.code);
    } catch (err) {
      callback({ success: false, message: err.message });
    }
  });

  // Player Submit Answer
  socket.on('player:submit_answer', ({ roomCode, playerKey, answer, timeSpentMs }, callback) => {
    try {
      const result = roomManager.submitAnswer(roomCode, playerKey, answer, timeSpentMs);
      if (callback) callback({ success: true, ...result });

      broadcastRoomState(roomCode);

      // If all active players submitted, auto advance to REVEAL
      if (result.allSubmitted) {
        const room = roomManager.getRoom(roomCode);
        if (room && room.timerInterval) {
          clearInterval(room.timerInterval);
          room.timerInterval = null;
        }
        if (room) {
          room.state = 'REVEAL';
          broadcastRoomState(roomCode);
        }
      }
    } catch (err) {
      if (callback) callback({ success: false, message: err.message });
    }
  });

  // Host Controls
  socket.on('host:start_game', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;

    room.state = 'QUESTION';
    room.currentQuestionIndex = 0;
    startQuestionTimer(roomCode);
  });

  socket.on('host:next_question', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;

    if (room.state === 'REVEAL' && room.settings.showLeaderboardAfterEach) {
      room.state = 'LEADERBOARD';
      broadcastRoomState(roomCode);
      return;
    }

    if (room.currentQuestionIndex + 1 < room.quiz.questions.length) {
      room.currentQuestionIndex++;
      room.state = 'QUESTION';
      startQuestionTimer(roomCode);
    } else {
      room.state = 'FINISHED';
      if (room.timerInterval) clearInterval(room.timerInterval);
      broadcastRoomState(roomCode);
      io.to(`room:${roomCode}`).emit('game-finished');
    }
  });

  socket.on('host:prev_question', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;
    if (room.currentQuestionIndex > 0) {
      room.currentQuestionIndex--;
      room.state = 'QUESTION';
      startQuestionTimer(roomCode);
    }
  });

  socket.on('host:pause', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (room) {
      room.isPaused = true;
      broadcastRoomState(roomCode);
    }
  });

  socket.on('host:resume', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (room) {
      room.isPaused = false;
      broadcastRoomState(roomCode);
    }
  });

  socket.on('host:restart_question', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;
    room.state = 'QUESTION';
    startQuestionTimer(roomCode);
  });

  socket.on('host:extend_timer', ({ roomCode, seconds = 10 }) => {
    const room = roomManager.getRoom(roomCode);
    if (room && room.state === 'QUESTION') {
      room.timerSeconds += seconds;
      broadcastRoomState(roomCode);
    }
  });

  socket.on('host:kick_player', ({ roomCode, playerKey }) => {
    const room = roomManager.getRoom(roomCode);
    if (room) {
      roomManager.kickPlayer(roomCode, playerKey);
      broadcastRoomState(roomCode);
    }
  });

  socket.on('host:toggle_lock', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (room) {
      room.isLocked = !room.isLocked;
      broadcastRoomState(roomCode);
    }
  });

  socket.on('host:end_game', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (room) {
      if (room.timerInterval) clearInterval(room.timerInterval);
      room.state = 'FINISHED';
      broadcastRoomState(roomCode);
    }
  });

  socket.on('disconnect', () => {
    const found = roomManager.getRoomBySocket(socket.id);
    if (found) {
      const { room, role, player } = found;
      if (role === 'player' && player) {
        player.connected = false;
        broadcastRoomState(room.code);
      }
    }
  });
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Quiz Server running on http://0.0.0.0:${PORT}`);
});
