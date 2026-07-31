import React from 'react';
import { useGame } from '../../context/GameContext';
import { LeaderboardTable } from '../Common/LeaderboardTable';
import { Trophy, Flame, Crown, ArrowUp, ArrowDown } from 'lucide-react';

export function PlayerScoreView() {
  const { playerRoomState, playerInfo } = useGame();

  if (!playerRoomState) return null;

  const { rankings = [] } = playerRoomState;
  const myRankInfo = rankings.find(r => r.nickname.toLowerCase() === playerInfo?.nickname.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      
      {/* Player Personal Score Summary */}
      {myRankInfo && (
        <div className="glass-panel-glow p-8 rounded-3xl text-center flex flex-col items-center gap-4 border border-purple-500/40 shadow-2xl">
          <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Your Current Score
          </span>

          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 font-mono tracking-tight">
            {myRankInfo.score.toLocaleString()} <span className="text-xl text-purple-300 font-normal">pts</span>
          </div>

          <div className="flex items-center gap-4 text-sm font-extrabold">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10">
              <Trophy className="w-4 h-4 text-amber-400" /> Rank #{myRankInfo.rank}
            </div>

            {myRankInfo.streak >= 2 && (
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" /> {myRankInfo.streak} Answer Streak!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
        <h3 className="text-xl font-black text-white mb-6 text-center">Current Leaderboard</h3>
        <LeaderboardTable rankings={rankings} showFull={false} />
      </div>

    </div>
  );
}
