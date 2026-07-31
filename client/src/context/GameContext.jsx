import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { soundEffects } from '../utils/soundEffects';

const GameContext = createContext();

// Dynamic Socket URL resolver for Vercel & Render deployment
const SOCKET_URL = 
  import.meta.env.VITE_SERVER_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001'
    : window.location.origin);

export function GameProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [activeView, setActiveView] = useState('HOME');
  
  // Host state
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [hostRoomState, setHostRoomState] = useState(null);

  // Player state
  const [playerInfo, setPlayerInfo] = useState(() => {
    const saved = localStorage.getItem('qclash_player_info');
    return saved ? JSON.parse(saved) : null;
  });
  const [playerRoomState, setPlayerRoomState] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('⚡ Connected to socket server:', newSocket.id);
      setIsConnected(true);
      
      // Fetch initial quiz list
      newSocket.emit('quiz:list', (data) => {
        if (Array.isArray(data)) setQuizzes(data);
      });
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('quiz:updated', (data) => {
      if (Array.isArray(data)) setQuizzes(data);
    });

    newSocket.on('room-state-update', (state) => {
      setHostRoomState(state);
    });

    newSocket.on('player-room-update', (state) => {
      setPlayerRoomState(state);
    });

    newSocket.on('timer-tick', ({ seconds }) => {
      if (seconds <= 5 && seconds > 0) {
        soundEffects.playTimerTick();
      }
    });

    newSocket.on('game-finished', () => {
      soundEffects.playFanfare();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const refreshQuizzes = () => {
    if (socket) {
      socket.emit('quiz:list', (data) => {
        if (Array.isArray(data)) setQuizzes(data);
      });
    }
  };

  const setPlayerSession = (info) => {
    setPlayerInfo(info);
    if (info) {
      localStorage.setItem('qclash_player_info', JSON.stringify(info));
    } else {
      localStorage.removeItem('qclash_player_info');
    }
  };

  return (
    <GameContext.Provider value={{
      socket,
      isConnected,
      quizzes,
      refreshQuizzes,
      activeView,
      setActiveView,
      editingQuiz,
      setEditingQuiz,
      hostRoomState,
      setHostRoomState,
      playerInfo,
      setPlayerSession,
      playerRoomState,
      setPlayerRoomState
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
