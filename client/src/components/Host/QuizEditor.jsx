import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';
import { ArrowLeft, Save, Plus, Trash2, Copy, Clock, Zap, CheckCircle2 } from 'lucide-react';

const QUESTION_TYPES = [
  { id: 'multiple_choice', label: 'Multiple Choice' },
  { id: 'multiple_select', label: 'Multiple Select' },
  { id: 'true_false', label: 'True / False' },
  { id: 'poll', label: 'Poll (No Wrong Answer)' },
  { id: 'type_answer', label: 'Type Answer' },
  { id: 'ordering', label: 'Ordering / Sequence' },
  { id: 'slider', label: 'Slider Guess' },
  { id: 'fill_blanks', label: 'Fill in the Blank' }
];

export function QuizEditor() {
  const { editingQuiz, socket, setActiveView } = useGame();
  const [quizData, setQuizData] = useState(editingQuiz || {
    title: 'New Quiz',
    description: '',
    category: 'General',
    questions: []
  });

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const handleSave = () => {
    if (!quizData.title.trim()) {
      alert('Please enter a quiz title!');
      return;
    }
    if (quizData.questions.length === 0) {
      alert('Please add at least 1 question!');
      return;
    }

    soundEffects.playClick();
    socket.emit('quiz:save', quizData, (res) => {
      if (res.success) {
        soundEffects.playClick();
        alert('Quiz saved successfully!');
        setActiveView('HOST_DASHBOARD');
      } else {
        alert(res.message || 'Failed to save quiz.');
      }
    });
  };

  const currentQ = quizData.questions[activeQuestionIdx] || null;

  const updateCurrentQ = (fields) => {
    const updated = [...quizData.questions];
    updated[activeQuestionIdx] = { ...updated[activeQuestionIdx], ...fields };
    setQuizData({ ...quizData, questions: updated });
  };

  const addQuestion = () => {
    soundEffects.playClick();
    const newQ = {
      id: `q-${Date.now()}`,
      type: 'multiple_choice',
      question: `Question #${quizData.questions.length + 1}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      timeLimit: 20,
      points: 1000
    };
    const updated = [...quizData.questions, newQ];
    setQuizData({ ...quizData, questions: updated });
    setActiveQuestionIdx(updated.length - 1);
  };

  const deleteQuestion = (idx) => {
    soundEffects.playClick();
    const updated = quizData.questions.filter((_, i) => i !== idx);
    setQuizData({ ...quizData, questions: updated });
    setActiveQuestionIdx(Math.max(0, idx - 1));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-purple-500/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { soundEffects.playClick(); setActiveView('HOST_DASHBOARD'); }}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white">Quiz Studio Editor</h2>
            <p className="text-xs text-purple-300">Customize questions, timing, scoring, and media settings.</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center gap-2 active:scale-95 transition-transform"
        >
          <Save className="w-5 h-5" /> Save Quiz
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar - Quiz Info & Question List */}
        <div className="lg:col-span-1 glass-panel p-5 rounded-3xl border border-white/10 flex flex-col gap-5">
          
          {/* Metadata inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Quiz Title</label>
              <input
                type="text"
                value={quizData.title}
                onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                className="w-full mt-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
              <input
                type="text"
                value={quizData.category || ''}
                onChange={(e) => setQuizData({ ...quizData, category: e.target.value })}
                className="w-full mt-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-purple-300">Questions ({quizData.questions.length})</span>
              <button
                onClick={addQuestion}
                className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {quizData.questions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  onClick={() => { soundEffects.playClick(); setActiveQuestionIdx(idx); }}
                  className={`p-3 rounded-xl cursor-pointer border text-xs font-bold flex items-center justify-between transition-all ${
                    activeQuestionIdx === idx
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <span className="truncate flex-1">#{idx + 1}. {q.question}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteQuestion(idx); }}
                    className="p-1 hover:text-rose-400 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Area - Detailed Question Configurator */}
        {currentQ ? (
          <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-6">
            
            {/* Type & Timing row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/10 pb-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Question Type</label>
                <select
                  value={currentQ.type}
                  onChange={(e) => updateCurrentQ({ type: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-purple-400"
                >
                  {QUESTION_TYPES.map(t => (
                    <option key={t.id} value={t.id} className="bg-[#130f26] text-white">{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Time Limit (Seconds)</label>
                <select
                  value={currentQ.timeLimit || 20}
                  onChange={(e) => updateCurrentQ({ timeLimit: Number(e.target.value) })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-purple-400"
                >
                  <option value={10} className="bg-[#130f26]">10 Seconds</option>
                  <option value={15} className="bg-[#130f26]">15 Seconds</option>
                  <option value={20} className="bg-[#130f26]">20 Seconds</option>
                  <option value={30} className="bg-[#130f26]">30 Seconds</option>
                  <option value={60} className="bg-[#130f26]">60 Seconds</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(currentQ.doublePoints)}
                    onChange={(e) => updateCurrentQ({ doublePoints: e.target.checked })}
                    className="w-4 h-4 rounded accent-purple-500"
                  />
                  ⚡ Double Points (2X)
                </label>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Question Prompt</label>
              <textarea
                rows={2}
                value={currentQ.question}
                onChange={(e) => updateCurrentQ({ question: e.target.value })}
                placeholder="Enter question text..."
                className="w-full mt-1.5 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Options configuration depending on type */}
            {(currentQ.type === 'multiple_choice' || currentQ.type === 'multiple_select' || currentQ.type === 'poll') && (
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Answer Choices & Correct Answer Marker</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQ.options?.map((opt, oIdx) => {
                    const isCorrectMC = currentQ.type === 'multiple_choice' && currentQ.correctAnswer === oIdx;
                    const isCorrectMS = currentQ.type === 'multiple_select' && Array.isArray(currentQ.correctAnswers) && currentQ.correctAnswers.includes(oIdx);

                    return (
                      <div key={oIdx} className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...currentQ.options];
                            newOpts[oIdx] = e.target.value;
                            updateCurrentQ({ options: newOpts });
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white font-bold text-sm focus:outline-none"
                        />

                        {currentQ.type === 'multiple_choice' && (
                          <button
                            type="button"
                            onClick={() => updateCurrentQ({ correctAnswer: oIdx })}
                            className={`p-2 rounded-lg text-xs font-bold ${
                              isCorrectMC ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {isCorrectMC ? 'Correct ✓' : 'Set Correct'}
                          </button>
                        )}

                        {currentQ.type === 'multiple_select' && (
                          <button
                            type="button"
                            onClick={() => {
                              const currArr = currentQ.correctAnswers || [];
                              const nextArr = currArr.includes(oIdx) ? currArr.filter(i => i !== oIdx) : [...currArr, oIdx];
                              updateCurrentQ({ correctAnswers: nextArr });
                            }}
                            className={`p-2 rounded-lg text-xs font-bold ${
                              isCorrectMS ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {isCorrectMS ? 'Correct ✓' : 'Toggle'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {currentQ.type === 'true_false' && (
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Correct True/False Answer</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateCurrentQ({ correctAnswer: 0 })}
                    className={`flex-1 py-3 rounded-xl font-bold text-base border ${
                      currentQ.correctAnswer === 0 ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    TRUE is Correct
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCurrentQ({ correctAnswer: 1 })}
                    className={`flex-1 py-3 rounded-xl font-bold text-base border ${
                      currentQ.correctAnswer === 1 ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    FALSE is Correct
                  </button>
                </div>
              </div>
            )}

            {(currentQ.type === 'type_answer' || currentQ.type === 'fill_blanks') && (
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Accepted Text Answers (Comma Separated)</label>
                <input
                  type="text"
                  value={(currentQ.acceptedAnswers || []).join(', ')}
                  onChange={(e) => updateCurrentQ({ acceptedAnswers: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g. Gold, Au, gold"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm focus:outline-none"
                />
              </div>
            )}

            {currentQ.type === 'slider' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Min Value</label>
                  <input
                    type="number"
                    value={currentQ.min ?? 0}
                    onChange={(e) => updateCurrentQ({ min: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Target Value</label>
                  <input
                    type="number"
                    value={currentQ.targetValue ?? 50}
                    onChange={(e) => updateCurrentQ({ targetValue: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Max Value</label>
                  <input
                    type="number"
                    value={currentQ.max ?? 100}
                    onChange={(e) => updateCurrentQ({ max: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm"
                  />
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="lg:col-span-3 glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-gray-400">
            Select or add a question to start editing.
          </div>
        )}

      </div>
    </div>
  );
}
