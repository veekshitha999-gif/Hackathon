import React from 'react';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';
import { QRCodeVisual } from '../../utils/qrGenerator';
import { Play, Users, Lock, Unlock, Copy, UserX, Settings, ShieldCheck, Sparkles } from 'lucide-react';

export function HostLobby() {
  const { hostRoomState, socket, setActiveView } = useGame();

  if (!hostRoomState) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-purple-300 font-bold">Creating Game Room Lobby...</p>
      </div>
    );
  }

  const { code, quizTitle, players = [], isLocked, settings } = hostRoomState;

  const copyCode = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(code);
    alert(`Room Code ${code} copied to clipboard!`);
  };

  const copyLink = () => {
    soundEffects.playClick();
    const link = `${window.location.origin}?room=${code}`;
    navigator.clipboard.writeText(link);
    alert(`Invite Link copied: ${link}`);
  };

  const handleToggleLock = () => {
    soundEffects.playClick();
    socket.emit('host:toggle_lock', { roomCode: code });
  };

  const handleKickPlayer = (playerKey) => {
    soundEffects.playClick();
    socket.emit('host:kick_player', { roomCode: code, playerKey });
  };

  const handleStartGame = () => {
    soundEffects.playClick();
    soundEffects.playFanfare();
    socket.emit('host:start_game', { roomCode: code });
    setActiveView('HOST_GAME');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col gap-8">
      
      {/* Top Banner: Quiz Title & Start Button */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Lobby Active
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">{quizTitle}</h2>
          <p className="text-gray-300 text-sm mt-1">Share the code or QR code below for players to join!</p>
        </div>

        <button
          disabled={players.length === 0}
          onClick={handleStartGame}
          className={`px-10 py-5 rounded-2xl font-black text-xl shadow-2xl flex items-center gap-3 transition-all transform ${
            players.length > 0
              ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:scale-105 active:scale-95 text-white shadow-emerald-500/40 animate-pulse-slow'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Play className="w-7 h-7 fill-white" /> START GAME NOW
        </button>
      </div>

      {/* Main Grid: Left Code & QR Card | Right Players List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Big Code & QR (5 Cols) */}
        <div className="lg:col-span-5 glass-panel-glow p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-6">
          <div className="text-xs font-black uppercase tracking-widest text-purple-300">
            JOIN AT WEBSITE WITH ROOM CODE:
          </div>

          <div 
            onClick={copyCode}
            title="Click to copy room code"
            className="cursor-pointer group relative bg-black/40 border-2 border-purple-400/50 hover:border-purple-400 px-8 py-4 rounded-3xl shadow-inner transition-all transform hover:scale-105"
          >
            <span className="text-6xl sm:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-300 font-mono">
              {code}
            </span>
            <span className="absolute -top-3 right-4 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Click to Copy
            </span>
          </div>

          {/* QR Code component */}
          <div className="my-2">
            <QRCodeVisual text={`${window.location.origin}?room=${code}`} size={180} />
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <button
              onClick={copyLink}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
            >
              <Copy className="w-4 h-4 text-purple-300" /> Copy Join Link
            </button>

            <button
              onClick={handleToggleLock}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                isLocked ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-white/10 text-white border-white/10'
              }`}
            >
              {isLocked ? <Lock className="w-4 h-4 text-rose-400" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
              {isLocked ? 'Locked' : 'Lock Lobby'}
            </button>
          </div>
        </div>

        {/* Right Column - Connected Player Grid (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-black text-white">
                Joined Players ({players.length})
              </h3>
            </div>
            {settings?.playAsHost && (
              <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Play as Host Active
              </span>
            )}
          </div>

          {players.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-gray-400 gap-3">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 animate-bounce">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-lg font-bold text-gray-300">Waiting for players to enter code...</p>
              <p className="text-xs text-gray-500">Players enter room code <strong className="text-purple-300">{code}</strong> on their phone or tablet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-1">
              {players.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 group hover:border-purple-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-extrabold flex items-center justify-center shadow-md">
                      {p.nickname.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-base block">{p.nickname}</span>
                      {p.isHost && <span className="text-[10px] text-purple-300 font-bold uppercase">Host Participant</span>}
                    </div>
                  </div>

                  {!p.isHost && (
                    <button
                      onClick={() => handleKickPlayer(p.id)}
                      className="p-2 rounded-lg bg-rose-500/10 opacity-0 group-hover:opacity-100 hover:bg-rose-500/30 text-rose-300 transition-all"
                      title="Kick Player"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
