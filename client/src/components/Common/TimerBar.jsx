import React from 'react';
import { Clock } from 'lucide-react';

export function TimerBar({ seconds, total = 20 }) {
  const percentage = Math.max(0, Math.min(100, (seconds / total) * 100));

  let barColor = 'bg-gradient-to-r from-purple-500 to-indigo-500';
  if (percentage < 40 && percentage >= 20) {
    barColor = 'bg-gradient-to-r from-amber-500 to-orange-500';
  } else if (percentage < 20) {
    barColor = 'bg-gradient-to-r from-rose-500 to-red-600 animate-pulse';
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono font-black text-lg text-white shrink-0">
        {seconds}
      </div>
      <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15 shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
