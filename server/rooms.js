/**
 * Real-time Room & Game Engine
 */
import { checkAnswer, calculateScore } from './scoring.js';

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomCode -> Room State
  }

  createRoom({ hostSocketId, hostUser, quiz, settings }) {
    let roomCode = generateRoomCode();
    while (this.rooms.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    const defaultSettings = {
      timerMultiplier: 1.0,
      shuffleQuestions: false,
      shuffleAnswers: false,
      showLeaderboardAfterEach: true,
      soundEnabled: true,
      playAsHost: false,
      lateJoin: true,
      ...settings
    };

    let processedQuestions = [...quiz.questions];
    if (defaultSettings.shuffleQuestions) {
      processedQuestions = processedQuestions.sort(() => Math.random() - 0.5);
    }

    const room = {
      code: roomCode,
      hostSocketId,
      hostUser,
      quiz: {
        ...quiz,
        questions: processedQuestions
      },
      settings: defaultSettings,
      state: 'LOBBY', // LOBBY, COUNTDOWN, QUESTION, REVEAL, LEADERBOARD, FINISHED
      isLocked: false,
      isPaused: false,
      currentQuestionIndex: 0,
      timerSeconds: 0,
      timerInterval: null,
      players: new Map(), // socketId or nickname -> Player object
      answers: new Map(), // questionIndex -> Map(playerKey -> answerData)
      statistics: [],
      createdAt: Date.now()
    };

    // If Play as Host is enabled, add Host as special player
    if (defaultSettings.playAsHost && hostUser) {
      const hostPlayerKey = `host-${hostUser.id || 'admin'}`;
      room.players.set(hostPlayerKey, {
        id: hostPlayerKey,
        socketId: hostSocketId,
        nickname: `${hostUser.name || 'Host'} (Host)`,
        isHost: true,
        score: 0,
        streak: 0,
        connected: true,
        rank: 1,
        prevRank: 1
      });
    }

    this.rooms.set(roomCode, room);
    return room;
  }

  getRoom(roomCode) {
    if (!roomCode) return null;
    return this.rooms.get(roomCode.toUpperCase().trim());
  }

  getRoomBySocket(socketId) {
    for (const room of this.rooms.values()) {
      if (room.hostSocketId === socketId) return { room, role: 'host' };
      for (const player of room.players.values()) {
        if (player.socketId === socketId) return { room, role: 'player', player };
      }
    }
    return null;
  }

  joinRoom(roomCode, nickname, socketId) {
    const room = this.getRoom(roomCode);
    if (!room) throw new Error('Room not found! Check your code.');
    if (room.isLocked) throw new Error('This lobby has been locked by the host.');
    if (room.state !== 'LOBBY' && !room.settings.lateJoin) {
      throw new Error('Game already in progress and late join is disabled.');
    }

    const cleanName = nickname.trim();
    if (!cleanName) throw new Error('Nickname cannot be empty.');

    // Check for duplicate nickname
    for (const p of room.players.values()) {
      if (p.nickname.toLowerCase() === cleanName.toLowerCase() && p.connected) {
        throw new Error('Nickname is already taken in this room.');
      }
    }

    // Check if player reconnecting
    let playerKey = cleanName.toLowerCase();
    let player = room.players.get(playerKey);

    if (player) {
      player.socketId = socketId;
      player.connected = true;
    } else {
      player = {
        id: playerKey,
        socketId,
        nickname: cleanName,
        isHost: false,
        score: 0,
        streak: 0,
        connected: true,
        rank: room.players.size + 1,
        prevRank: room.players.size + 1
      };
      room.players.set(playerKey, player);
    }

    return { room, player };
  }

  submitAnswer(roomCode, playerKey, answer, timeSpentMs) {
    const room = this.getRoom(roomCode);
    if (!room) throw new Error('Room not found.');
    if (room.state !== 'QUESTION') throw new Error('Answers are not currently accepted.');

    const qIdx = room.currentQuestionIndex;
    const currentQ = room.quiz.questions[qIdx];
    if (!currentQ) throw new Error('Invalid question index.');

    if (!room.answers.has(qIdx)) {
      room.answers.set(qIdx, new Map());
    }
    const qAnswers = room.answers.get(qIdx);

    // Prevent double submission
    if (qAnswers.has(playerKey)) {
      return { alreadySubmitted: true };
    }

    const isCorrect = checkAnswer(currentQ, answer);
    const player = room.players.get(playerKey);
    const currentStreak = player ? player.streak : 0;

    const scoreResult = calculateScore({
      question: currentQ,
      isCorrect,
      timeSpentMs,
      timeLimitSec: currentQ.timeLimit || 20,
      currentStreak
    });

    if (player) {
      player.score += scoreResult.points;
      player.streak = scoreResult.newStreak;
    }

    const answerRecord = {
      playerKey,
      nickname: player ? player.nickname : 'Player',
      answer,
      isCorrect,
      timeSpentMs,
      scoreResult,
      timestamp: Date.now()
    };

    qAnswers.set(playerKey, answerRecord);

    const activePlayerCount = Array.from(room.players.values()).filter(p => p.connected).length;
    const submittedCount = qAnswers.size;

    return {
      answerRecord,
      allSubmitted: submittedCount >= activePlayerCount,
      submittedCount,
      totalPlayers: activePlayerCount
    };
  }

  getLiveDistribution(roomCode) {
    const room = this.getRoom(roomCode);
    if (!room) return null;
    const qIdx = room.currentQuestionIndex;
    const currentQ = room.quiz.questions[qIdx];
    if (!currentQ) return null;

    const qAnswers = room.answers.get(qIdx) || new Map();
    const totalAnswers = qAnswers.size;

    // Distribution map
    const counts = {};
    if (currentQ.options) {
      currentQ.options.forEach((opt, idx) => {
        counts[idx] = 0;
      });
    }

    qAnswers.forEach((ansRecord) => {
      if (Array.isArray(ansRecord.answer)) {
        ansRecord.answer.forEach(idx => {
          if (counts[idx] !== undefined) counts[idx]++;
        });
      } else if (counts[ansRecord.answer] !== undefined) {
        counts[ansRecord.answer]++;
      }
    });

    return {
      questionIndex: qIdx,
      totalAnswers,
      counts
    };
  }

  updateRankings(room) {
    const playerList = Array.from(room.players.values());
    playerList.sort((a, b) => b.score - a.score);

    playerList.forEach((p, index) => {
      p.prevRank = p.rank || (index + 1);
      p.rank = index + 1;
    });
  }

  kickPlayer(roomCode, playerKey) {
    const room = this.getRoom(roomCode);
    if (!room) return false;
    room.players.delete(playerKey);
    this.updateRankings(room);
    return true;
  }

  deleteRoom(roomCode) {
    const room = this.getRoom(roomCode);
    if (room && room.timerInterval) {
      clearInterval(room.timerInterval);
    }
    this.rooms.delete(roomCode);
  }
}

export const roomManager = new RoomManager();
