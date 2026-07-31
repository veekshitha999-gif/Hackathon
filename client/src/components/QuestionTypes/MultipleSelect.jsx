import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { Check, CheckSquare, Square } from 'lucide-react';

export function MultipleSelect({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const options = question.options || [];
  const [selected, setSelected] = useState(Array.isArray(selectedAnswer) ? selectedAnswer : []);

  const toggleOption = (idx) => {
    if (disabled) return;
    soundEffects.playClick();
    if (selected.includes(idx)) {
      setSelected(selected.filter(i => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  const handleFinalSubmit = () => {
    if (disabled || selected.length === 0) return;
    soundEffects.playClick();
    onSubmit(selected);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
      <div className="text-xs uppercase tracking-wider font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
        ☑ Select ALL correct answers
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt, idx) => {
          const isChecked = selected.includes(idx);
          const isCorrect = showResult && Array.isArray(question.correctAnswers) && question.correctAnswers.includes(idx);

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => toggleOption(idx)}
              className={`p-5 rounded-2xl font-bold text-lg text-left transition-all border flex items-center justify-between gap-4 ${
                isChecked
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
              } ${isCorrect ? 'ring-4 ring-emerald-400 bg-emerald-600/80 border-emerald-400' : ''}`}
            >
              <span className="flex-1">{opt}</span>
              <div className="shrink-0">
                {isChecked ? <CheckSquare className="w-6 h-6 text-white" /> : <Square className="w-6 h-6 text-gray-400" />}
              </div>
            </button>
          );
        })}
      </div>

      {!showResult && (
        <button
          disabled={disabled || selected.length === 0}
          onClick={handleFinalSubmit}
          className={`px-8 py-3.5 rounded-xl font-extrabold text-lg shadow-xl transition-all ${
            selected.length > 0 && !disabled
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/30 scale-105 active:scale-95'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Answer ({selected.length} Selected)
        </button>
      )}
    </div>
  );
}
