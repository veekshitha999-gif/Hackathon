import React from 'react';
import { Crown, Trophy, Medal, Star } from 'lucide-react';

export function Podium({ top3 = [] }) {
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return (
    <div className="w-full max-w-2xl mx-auto flex items-end justify-center gap-3 sm:gap-6 pt-12 pb-6 px-4">
      
      {/* 2ND PLACE */}
      {second ? (
        <div className="flex-1 flex flex-col items-center animate-bounce-gentle">
          <div className="mb-2 flex flex-col items-center">
            <Medal className="w-8 h-8 text-slate-300 mb-1" />
            <span className="font-extrabold text-sm sm:text-base text-white text-center truncate max-w-[100px]">{second.nickname}</span>
            <span className="text-xs font-mono text-slate-300 font-bold">{second.score.toLocaleString()} pts</span>
          </div>
          <div className="w-full h-40 bg-gradient-to-t from-slate-800 to-slate-600 rounded-t-2xl border-t-4 border-slate-300 shadow-xl flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-200 font-mono">2</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-300 font-extrabold">SILVER</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 h-40 border-2 border-dashed border-white/10 rounded-t-2xl"></div>
      )}

      {/* 1ST PLACE */}
      {first ? (
        <div className="flex-1 flex flex-col items-center -mt-8 z-10">
          <div className="mb-2 flex flex-col items-center">
            <div className="relative">
              <Crown className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-pulse drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
              <Star className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-spin" />
            </div>
            <span className="font-black text-base sm:text-xl text-yellow-300 text-center truncate max-w-[120px] drop-shadow-md">{first.nickname}</span>
            <span className="text-sm font-mono text-yellow-400 font-extrabold">{first.score.toLocaleString()} pts</span>
          </div>
          <div className="w-full h-56 bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 rounded-t-3xl border-t-4 border-yellow-200 shadow-2xl shadow-yellow-500/40 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-slate-950 font-mono">1</span>
            <span className="text-xs uppercase tracking-widest text-slate-950 font-black">CHAMPION</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 h-56 border-2 border-dashed border-white/10 rounded-t-3xl"></div>
      )}

      {/* 3RD PLACE */}
      {third ? (
        <div className="flex-1 flex flex-col items-center">
          <div className="mb-2 flex flex-col items-center">
            <Trophy className="w-7 h-7 text-amber-600 mb-1" />
            <span className="font-extrabold text-sm sm:text-base text-white text-center truncate max-w-[100px]">{third.nickname}</span>
            <span className="text-xs font-mono text-amber-500 font-bold">{third.score.toLocaleString()} pts</span>
          </div>
          <div className="w-full h-32 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-2xl border-t-4 border-amber-600 shadow-xl flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-amber-200 font-mono">3</span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200 font-extrabold">BRONZE</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 h-32 border-2 border-dashed border-white/10 rounded-t-2xl"></div>
      )}

    </div>
  );
}
