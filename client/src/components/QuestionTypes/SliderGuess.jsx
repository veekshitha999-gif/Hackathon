import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { Sliders, Target } from 'lucide-react';

export function SliderGuess({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const min = question.min ?? 0;
  const max = question.max ?? 100;
  const [val, setVal] = useState(selectedAnswer !== undefined ? selectedAnswer : Math.round((min + max) / 2));

  const handleChange = (e) => {
    setVal(Number(e.target.value));
  };

  const handleFinalSubmit = () => {
    if (disabled) return;
    soundEffects.playClick();
    onSubmit(val);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-500/30">
        <Sliders className="w-4 h-4" /> Slider Guess
      </div>

      <div className="w-full bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center gap-6 shadow-2xl">
        <div className="text-5xl font-black text-amber-400 font-mono tracking-tight bg-amber-400/10 border border-amber-400/30 px-8 py-4 rounded-2xl">
          {val}
        </div>

        <input
          type="range"
          min={min}
          max={max}
          disabled={disabled}
          value={val}
          onChange={handleChange}
          className="w-full h-4 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />

        <div className="w-full flex justify-between text-xs font-bold text-gray-400">
          <span>MIN: {min}</span>
          <span>MAX: {max}</span>
        </div>
      </div>

      {!showResult && (
        <button
          disabled={disabled}
          onClick={handleFinalSubmit}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xl shadow-xl shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Target className="w-6 h-6" /> Submit Number Guess
        </button>
      )}

      {showResult && (
        <div className="text-center bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-2xl">
          <p className="text-xs uppercase text-emerald-300 font-bold">Exact Target Answer:</p>
          <p className="text-3xl font-black text-white mt-1">{question.targetValue}</p>
        </div>
      )}
    </div>
  );
}
