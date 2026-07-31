import React from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { BarChart3 } from 'lucide-react';

export function Poll({ question, onSubmit, disabled, selectedAnswer }) {
  const options = question.options || [];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-500/30">
        <BarChart3 className="w-4 h-4" /> Live Audience Poll (No wrong answer!)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => {
                soundEffects.playClick();
                onSubmit(idx);
              }}
              className={`p-6 rounded-2xl font-bold text-xl text-left transition-all border flex items-center justify-between ${
                isSelected
                  ? 'bg-amber-500 border-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/30 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
              } ${disabled && !isSelected ? 'opacity-50' : ''}`}
            >
              <span>{opt}</span>
              {isSelected && <span className="text-xs bg-black/30 text-white px-2 py-1 rounded">Selected</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
