import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { Edit3, Check } from 'lucide-react';

export function FillBlanks({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const [text, setText] = useState(selectedAnswer || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || !text.trim()) return;
    soundEffects.playClick();
    onSubmit(text.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-4 py-1.5 rounded-full border border-teal-500/30">
        <Edit3 className="w-4 h-4" /> Fill In The Blank
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          disabled={disabled}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Fill in the blank word..."
          className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-teal-500/40 text-white placeholder-gray-400 text-2xl font-bold text-center focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-500/20 shadow-inner"
        />

        {!showResult && (
          <button
            type="submit"
            disabled={disabled || !text.trim()}
            className={`w-full py-4 rounded-2xl font-extrabold text-xl transition-all shadow-xl flex items-center justify-center gap-2 ${
              text.trim() && !disabled
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-500/30 active:scale-98'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5" /> Submit Missing Word
          </button>
        )}
      </form>
    </div>
  );
}
