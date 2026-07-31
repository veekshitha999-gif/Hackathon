import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';
import { Plus, Search, Play, Edit3, Copy, Trash2, Download, Upload, Eye, Layers } from 'lucide-react';
import { QuizPreviewModal } from './QuizPreviewModal';

export function HostDashboard() {
  const { quizzes, socket, setEditingQuiz, setActiveView } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [previewQuiz, setPreviewQuiz] = useState(null);

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.category && q.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNew = () => {
    soundEffects.playClick();
    setEditingQuiz({
      title: 'Untitled Masterpiece Quiz',
      description: 'Test your audience with epic questions!',
      category: 'General Trivia',
      coverColor: 'from-purple-600 to-indigo-700',
      questions: [
        {
          id: `q-${Date.now()}`,
          type: 'multiple_choice',
          question: 'Sample Question #1?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          timeLimit: 20,
          points: 1000
        }
      ]
    });
    setActiveView('QUIZ_EDITOR');
  };

  const handleEdit = (quiz) => {
    soundEffects.playClick();
    setEditingQuiz(quiz);
    setActiveView('QUIZ_EDITOR');
  };

  const handleDuplicate = (quizId) => {
    soundEffects.playClick();
    if (socket) {
      socket.emit('quiz:duplicate', quizId, (res) => {
        if (res.success) {
          soundEffects.playClick();
        }
      });
    }
  };

  const handleDelete = (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      soundEffects.playClick();
      if (socket) {
        socket.emit('quiz:delete', quizId);
      }
    }
  };

  const handleExportJSON = (quiz) => {
    soundEffects.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quiz, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${quiz.title.replace(/[^a-z0-9]/gi, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.title && Array.isArray(imported.questions)) {
          socket.emit('quiz:save', imported, () => {
            soundEffects.playClick();
            alert('Quiz imported successfully!');
          });
        } else {
          alert('Invalid quiz JSON format!');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleLaunchLobby = (quiz) => {
    soundEffects.playClick();
    if (socket) {
      socket.emit('room:create', {
        quizId: quiz.id,
        quiz: quiz,
        settings: {
          timerMultiplier: 1.0,
          shuffleQuestions: false,
          shuffleAnswers: false,
          showLeaderboardAfterEach: true,
          soundEnabled: true,
          playAsHost: true,
          lateJoin: true
        }
      }, (res) => {
        if (res && res.success) {
          setActiveView('HOST_LOBBY');
        } else {
          alert((res && res.message) || 'Failed to launch lobby');
        }
      });
    } else {
      alert('Socket connection is connecting... Please try in a second.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col gap-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-2">
            <Layers className="w-8 h-8 text-purple-400" /> Host Quiz Library
          </h2>
          <p className="text-gray-300 text-sm mt-1">Manage, create, and launch real-time interactive quiz sessions.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <label className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm cursor-pointer border border-white/10 transition-all flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-300" /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleCreateNew}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Create New Quiz
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search quizzes by title or category..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20"
        />
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Category pill & question count */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {quiz.category || 'General'}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {quiz.questions?.length || 0} Questions
                </span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                {quiz.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {quiz.description || 'No description provided.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setPreviewQuiz(quiz)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Preview Questions"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleExportJSON(quiz)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Export JSON"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDuplicate(quiz.id)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleEdit(quiz)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white transition-colors"
                title="Edit Quiz"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(quiz.id)}
                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleLaunchLobby(quiz)}
                className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm shadow-md shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <Play className="w-4 h-4 fill-white" /> Host Game
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewQuiz && (
        <QuizPreviewModal quiz={previewQuiz} onClose={() => setPreviewQuiz(null)} />
      )}
    </div>
  );
}
