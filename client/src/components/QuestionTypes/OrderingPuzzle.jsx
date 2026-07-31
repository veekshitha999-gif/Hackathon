import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { ArrowUp, ArrowDown, MoveVertical, CheckCircle2 } from 'lucide-react';

export function OrderingPuzzle({ question, onSubmit, disabled, selectedAnswer, showResult }) {
  const initialItems = question.options || [];
  const [items, setItems] = useState(
    Array.isArray(selectedAnswer) ? selectedAnswer : [...initialItems]
  );

  const moveItem = (index, direction) => {
    if (disabled) return;
    soundEffects.playClick();
    const newItems = [...items];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setItems(newItems);
  };

  const handleFinalSubmit = () => {
    if (disabled) return;
    soundEffects.playClick();
    onSubmit(items);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-4 py-1.5 rounded-full border border-pink-500/30">
        <MoveVertical className="w-4 h-4" /> Arrange in Correct Sequence
      </div>

      <div className="w-full flex flex-col gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-white/10 border border-white/15 rounded-2xl shadow-md text-lg font-bold"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/30 text-purple-200 flex items-center justify-center font-extrabold text-sm">
                #{idx + 1}
              </span>
              <span>{item}</span>
            </div>

            {!disabled && (
              <div className="flex items-center gap-2">
                <button
                  disabled={idx === 0}
                  onClick={() => moveItem(idx, -1)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30"
                >
                  <ArrowUp className="w-5 h-5 text-white" />
                </button>
                <button
                  disabled={idx === items.length - 1}
                  onClick={() => moveItem(idx, 1)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30"
                >
                  <ArrowDown className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!showResult && (
        <button
          disabled={disabled}
          onClick={handleFinalSubmit}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-lg shadow-xl shadow-pink-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-6 h-6" /> Lock In Sequence
        </button>
      )}
    </div>
  );
}
