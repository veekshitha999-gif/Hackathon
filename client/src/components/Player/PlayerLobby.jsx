import React from 'react';
import { useGame } from '../../context/GameContext';
import { Users, Sparkles, CheckCircle2 } from 'lucide-react';

export function PlayerLobby() {
  const { playerInfo } = useGame();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl text-center flex flex-col items-center gap-6">
        
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/30 animate-bounce">
          <div className="w-full h-full bg-[#0b0819] rounded-[22px] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            You're In!
          </span>
          <h2 className="text-3xl font-black text-white mt-2">
            Welcome, <span className="text-purple-300">{playerInfo?.nickname}</span>!
          </h2>
          <p className="text-gray-300 text-sm mt-1">Room Code: <strong className="text-yellow-400 font-mono tracking-widest">{playerInfo?.roomCode}</strong></p>
        </div>

        <div className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" /> Waiting for host to start game...
          </div>
          <p className="text-xs text-gray-400">See your name on the big screen! Get ready to answer fast.</p>
        </div>

      </div>
    </div>
  );
}
