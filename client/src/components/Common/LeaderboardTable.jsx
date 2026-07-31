import React from 'react';
import { Trophy, Flame, Crown, ArrowUp, ArrowDown, Minus, ShieldCheck } from 'lucide-react';

export function LeaderboardTable({ rankings = [], showFull = true }) {
  if (!rankings || rankings.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        No participants on the leaderboard yet.
      </div>
    );
  }

  const list = showFull ? rankings : rankings.slice(0, 5);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-2.5">
      {list.map((player, idx) => {
        const rank = player.rank || (idx + 1);
        const prevRank = player.prevRank || rank;
        const rankDelta = prevRank - rank;

        let medalColor = 'bg-white/10 text-gray-300 border-white/10';
        if (rank === 1) medalColor = 'bg-amber-500 text-slate-950 border-amber-400 font-black';
        if (rank === 2) medalColor = 'bg-slate-300 text-slate-950 border-slate-200 font-black';
        if (rank === 3) medalColor = 'bg-amber-700 text-amber-100 border-amber-600 font-black';

        return (
          <div
            key={player.nickname}
            className={`p-4 rounded-2xl glass-panel border flex items-center justify-between transition-all transform hover:scale-[1.01] ${
              rank === 1 ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base shrink-0 shadow-md ${medalColor}`}>
                {rank === 1 ? <Crown className="w-5 h-5 fill-slate-950" /> : `#${rank}`}
              </div>

              {/* Rank movement */}
              <div className="flex items-center text-xs font-bold w-6">
                {rankDelta > 0 && (
                  <span className="text-emerald-400 flex items-center"><ArrowUp className="w-4 h-4" />{rankDelta}</span>
                )}
                {rankDelta < 0 && (
                  <span className="text-rose-400 flex items-center"><ArrowDown className="w-4 h-4" />{Math.abs(rankDelta)}</span>
                )}
                {rankDelta === 0 && (
                  <span className="text-gray-500"><Minus className="w-4 h-4" /></span>
                )}
              </div>

              {/* Player details */}
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white">{player.nickname}</span>
                {player.isHost && (
                  <span className="flex items-center gap-1 text-[11px] bg-purple-500/30 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full font-bold">
                    <ShieldCheck className="w-3 h-3 text-purple-300" /> Host
                  </span>
                )}
              </div>
            </div>

            {/* Score & Streak */}
            <div className="flex items-center gap-4">
              {player.streak >= 2 && (
                <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-extrabold animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {player.streak} Streak
                </div>
              )}
              <div className="text-right">
                <span className="text-xl font-black text-purple-300 font-mono tracking-tight">
                  {player.score.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 font-medium ml-1">pts</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
