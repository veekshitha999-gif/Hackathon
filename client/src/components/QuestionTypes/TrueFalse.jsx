import React from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { CheckCircle2, XCircle } from 'lucide-react';

export function TrueFalse({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const handleSelect = (idx) => {
    soundEffects.playClick();
    onSubmit(idx);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
      {/* TRUE */}
      <button
        disabled={disabled}
        onClick={() => handleSelect(0)}
        className={`p-8 rounded-3xl font-black text-3xl transition-all transform active:scale-95 flex flex-col items-center justify-center gap-3 option-blue ${
          selectedAnswer === 0 ? 'ring-4 ring-white scale-105' : ''
        } ${disabled && selectedAnswer !== 0 ? 'opacity-50' : ''} ${
          showResult && question.correctAnswer === 0 ? 'ring-4 ring-emerald-400 animate-bounce' : ''
        }`}
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
        TRUE
      </button>

      {/* FALSE */}
      <button
        disabled={disabled}
        onClick={() => handleSelect(1)}
        className={`p-8 rounded-3xl font-black text-3xl transition-all transform active:scale-95 flex flex-col items-center justify-center gap-3 option-red ${
          selectedAnswer === 1 ? 'ring-4 ring-white scale-105' : ''
        } ${disabled && selectedAnswer !== 1 ? 'opacity-50' : ''} ${
          showResult && question.correctAnswer === 1 ? 'ring-4 ring-emerald-400 animate-bounce' : ''
        }`}
      >
        <XCircle className="w-12 h-12 text-white" />
        FALSE
      </button>
    </div>
  );
}
