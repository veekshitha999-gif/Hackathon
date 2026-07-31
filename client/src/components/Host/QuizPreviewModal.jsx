import React from 'react';
import { X, HelpCircle, Clock, Zap } from 'lucide-react';

export function QuizPreviewModal({ quiz, onClose }) {
  if (!quiz) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#130f26] border border-purple-500/30 w-full max-w-3xl rounded-3xl p-6 sm:p-8 max-h-[85vh] flex flex-col gap-6 overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-black text-white">{quiz.title}</h3>
            <p className="text-sm text-purple-300 font-medium">{quiz.questions?.length || 0} Questions | {quiz.category || 'General'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {quiz.questions?.map((q, idx) => (
            <div key={q.id || idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                  Question #{idx + 1} • {q.type}
                </span>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {q.timeLimit || 20}s</span>
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-purple-400" /> {q.points || 1000} pts</span>
                </div>
              </div>

              <h4 className="text-lg font-bold text-white">{q.question}</h4>

              {/* Options or accepted answers preview */}
              {q.options && (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl text-xs font-semibold border ${
                        (q.correctAnswer === oIdx || (Array.isArray(q.correctAnswers) && q.correctAnswers.includes(oIdx)))
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      {opt} {(q.correctAnswer === oIdx || (Array.isArray(q.correctAnswers) && q.correctAnswers.includes(oIdx))) && '✓'}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}
