import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { Send, Keyboard } from 'lucide-react';

export function TypeAnswer({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const [text, setText] = useState(selectedAnswer || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || !text.trim()) return;
    soundEffects.playClick();
    onSubmit(text.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-4 py-1.5 rounded-full border border-blue-500/30">
        <Keyboard className="w-4 h-4" /> Type Your Answer
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          disabled={disabled}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type answer here..."
          className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-purple-500/40 text-white placeholder-gray-400 text-2xl font-bold text-center focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 shadow-inner"
        />

        {!showResult && (
          <button
            type="submit"
            disabled={disabled || !text.trim()}
            className={`w-full py-4 rounded-2xl font-extrabold text-xl transition-all shadow-xl flex items-center justify-center gap-2 ${
              text.trim() && !disabled
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/30 active:scale-98'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" /> Submit Answer
          </button>
        )}
      </form>

      {showResult && question.acceptedAnswers && (
        <div className="text-center bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-xl">
          <p className="text-xs uppercase text-emerald-300 font-bold">Accepted Answers:</p>
          <p className="text-lg font-bold text-white mt-1">{question.acceptedAnswers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
