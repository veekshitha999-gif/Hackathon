import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';
import { Play, Sparkles, User, KeyRound } from 'lucide-react';

export function JoinRoom() {
  const { socket, setPlayerSession, setActiveView } = useGame();
  
  // Extract URL parameter ?room=XXXX if present
  const params = new URLSearchParams(window.location.search);
  const initialRoom = params.get('room') || '';

  const [roomCode, setRoomCode] = useState(initialRoom.toUpperCase());
  const [nickname, setNickname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomCode.trim() || !nickname.trim()) {
      setErrorMsg('Please enter both room code and nickname.');
      return;
    }

    soundEffects.playClick();
    setErrorMsg('');
    setLoading(true);

    if (socket) {
      socket.emit('room:join', {
        roomCode: roomCode.trim().toUpperCase(),
        nickname: nickname.trim()
      }, (res) => {
        setLoading(false);
        if (res.success) {
          soundEffects.playCorrect();
          setPlayerSession({
            roomCode: res.roomCode,
            nickname: res.nickname,
            playerKey: res.playerKey
          });
          setActiveView('PLAYER_LOBBY');
        } else {
          soundEffects.playWrong();
          setErrorMsg(res.message || 'Failed to join room.');
        }
      });
    } else {
      setLoading(false);
      setErrorMsg('Socket server offline.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel-glow p-8 rounded-3xl border border-purple-500/40 shadow-2xl flex flex-col items-center gap-6">
        
        {/* Logo Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-400 p-0.5 shadow-xl shadow-purple-500/30 animate-float">
          <div className="w-full h-full bg-[#0b0819] rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-black text-white">Join Live Quiz</h2>
          <p className="text-xs text-purple-300 font-semibold mt-1">Enter your 4-letter room pin & nickname to start!</p>
        </div>

        {errorMsg && (
          <div className="w-full p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center animate-shake">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleJoin} className="w-full flex flex-col gap-4">
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-purple-400" /> Room Code
            </label>
            <input
              type="text"
              maxLength={4}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. K9X2"
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border-2 border-purple-500/30 text-white font-mono font-black text-3xl tracking-widest text-center focus:outline-none focus:border-purple-400 uppercase"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-pink-400" /> Player Nickname
            </label>
            <input
              type="text"
              maxLength={15}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. SpeedyRacer"
              className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white font-extrabold text-lg text-center focus:outline-none focus:border-pink-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-black text-xl shadow-xl shadow-purple-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? 'Joining Arena...' : <>Join Game Arena <Play className="w-5 h-5 fill-white" /></>}
          </button>
        </form>

      </div>
    </div>
  );
}
