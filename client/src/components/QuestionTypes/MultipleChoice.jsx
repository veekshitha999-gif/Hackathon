import React from 'react';
import { soundEffects } from '../../utils/soundEffects';

const OPTION_STYLES = [
  'option-red text-white',
  'option-blue text-white',
  'option-yellow text-white',
  'option-green text-white',
  'option-purple text-white'
];

const OPTION_SHAPES = ['▲', '◆', '●', '■', '★'];

export function MultipleChoice({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const options = question.options || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
      {options.map((opt, idx) => {
        const styleClass = OPTION_STYLES[idx % OPTION_STYLES.length];
        const shape = OPTION_SHAPES[idx % OPTION_SHAPES.length];
        const isSelected = selectedAnswer === idx;
        const isCorrect = showResult && question.correctAnswer === idx;
        const isWrong = showResult && isSelected && question.correctAnswer !== idx;

        return (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => {
              soundEffects.playClick();
              onSubmit(idx);
            }}
            className={`relative p-6 rounded-2xl font-extrabold text-xl sm:text-2xl transition-all transform active:scale-95 flex items-center justify-start gap-4 text-left ${styleClass} ${
              isSelected ? 'ring-4 ring-white scale-[1.02]' : ''
            } ${disabled && !isSelected ? 'opacity-50' : ''} ${
              isCorrect ? 'ring-4 ring-emerald-400 scale-[1.03] animate-bounce' : ''
            } ${isWrong ? 'opacity-40 grayscale' : ''}`}
          >
            <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-lg font-black shrink-0">
              {shape}
            </span>
            <span className="flex-1 break-words">{opt}</span>
            {isCorrect && (
              <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-md">Correct ✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
