import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';
import { TimerBar } from '../Common/TimerBar';
import { LeaderboardTable } from '../Common/LeaderboardTable';
import { Podium } from '../Common/Podium';
import { ConfettiCanvas } from '../Common/ConfettiCanvas';
import { exportToCSV, printSummaryReport } from '../../utils/exportHelper';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Clock, BarChart2, Trophy, Download, Printer, ShieldCheck } from 'lucide-react';

export function HostGameControl() {
  const { hostRoomState, socket, setActiveView } = useGame();
  const [activeTab, setActiveTab] = useState('STATS'); // STATS | LEADERBOARD
  const [hostAnswer, setHostAnswer] = useState(null);

  const state = hostRoomState?.state;

  // Auto-switch tabs based on game state
  useEffect(() => {
    if (state === 'LEADERBOARD') {
      setActiveTab('LEADERBOARD');
    } else if (state === 'QUESTION') {
      setActiveTab('STATS');
    }
  }, [state]);

  if (!hostRoomState) return null;

  const {
    code,
    quizTitle,
    isPaused,
    currentQuestionIndex,
    totalQuestions,
    currentQuestion,
    players = [],
    timerSeconds,
    liveDistribution
  } = hostRoomState;

  const isFinished = state === 'FINISHED';
  const isReveal = state === 'REVEAL';

  // Controls
  const handlePauseResume = () => {
    soundEffects.playClick();
    if (isPaused) {
      socket.emit('host:resume', { roomCode: code });
    } else {
      socket.emit('host:pause', { roomCode: code });
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    setHostAnswer(null);
    socket.emit('host:next_question', { roomCode: code });
  };

  const handlePrev = () => {
    soundEffects.playClick();
    setHostAnswer(null);
    socket.emit('host:prev_question', { roomCode: code });
  };

  const handleExtendTimer = () => {
    soundEffects.playClick();
    socket.emit('host:extend_timer', { roomCode: code, seconds: 10 });
  };

  const handleRestartQuestion = () => {
    soundEffects.playClick();
    setHostAnswer(null);
    socket.emit('host:restart_question', { roomCode: code });
  };

  const handleEndGame = () => {
    if (window.confirm('Are you sure you want to end the game?')) {
      soundEffects.playClick();
      socket.emit('host:end_game', { roomCode: code });
    }
  };

  // Host Play as Host answer submission
  const submitHostAnswer = (answer) => {
    soundEffects.playClick();
    setHostAnswer(answer);
    const hostPlayer = players.find(p => p.isHost);
    if (hostPlayer) {
      socket.emit('player:submit_answer', {
        roomCode: code,
        playerKey: hostPlayer.id,
        answer,
        timeSpentMs: ((currentQuestion?.timeLimit || 20) - timerSeconds) * 1000
      });
    }
  };

  // If Game finished -> Show Winner Podium & Export Options!
  if (isFinished) {
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);

    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col gap-8">
        <ConfettiCanvas trigger={true} />

        <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 text-center flex flex-col items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            🏆 Tournament Completed
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">{quizTitle} - Grand Finale</h2>
        </div>

        {/* Podium */}
        <Podium top3={top3} />

        {/* Leaderboard Table */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-black text-white mb-6 text-center">Full Final Rankings</h3>
          <LeaderboardTable rankings={sorted} showFull={true} />

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => exportToCSV(quizTitle, sorted)}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download CSV Results
            </button>

            <button
              onClick={() => printSummaryReport(quizTitle, sorted)}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/10 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print / PDF Summary
            </button>

            <button
              onClick={() => { soundEffects.playClick(); setActiveView('HOST_DASHBOARD'); }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate live responses
  const totalResps = liveDistribution?.totalAnswers || 0;
  const activePlayersCount = players.filter(p => p.connected).length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      
      {/* Top Header & Navigation Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-purple-300 uppercase">
            Question {currentQuestionIndex + 1} of {totalQuestions} • Room {code}
          </span>
          <h3 className="text-xl font-black text-white line-clamp-1">{currentQuestion?.question}</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('STATS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'STATS' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Live Chart
          </button>
          <button
            onClick={() => setActiveTab('LEADERBOARD')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'LEADERBOARD' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Trophy className="w-4 h-4" /> Scoreboard
          </button>
        </div>
      </div>

      {/* Timer Bar */}
      {state === 'QUESTION' && (
        <TimerBar seconds={timerSeconds} total={currentQuestion?.timeLimit || 20} />
      )}

      {/* Live Chart or Leaderboard View */}
      {activeTab === 'STATS' ? (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-purple-300">Live Response Distribution</span>
            <span className="text-sm font-bold text-gray-300">
              Answered: <strong className="text-purple-300">{totalResps}</strong> / {activePlayersCount}
            </span>
          </div>

          {/* Bar chart rendering */}
          {currentQuestion?.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {currentQuestion.options.map((opt, idx) => {
                const count = liveDistribution?.counts[idx] || 0;
                const percent = totalResps > 0 ? Math.round((count / totalResps) * 100) : 0;
                const isCorrect = isReveal && currentQuestion.correctAnswer === idx;

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                      isCorrect ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-200 line-clamp-2">{opt}</span>
                      {isCorrect && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Correct</span>}
                    </div>

                    <div className="space-y-1">
                      <div className="h-20 bg-black/30 rounded-xl relative flex items-end overflow-hidden p-1">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-lg transition-all duration-500"
                          style={{ height: `${percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300">
                        <span>{count} votes</span>
                        <span>{percent}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-white">Current Standings</h3>
            <p className="text-xs text-gray-400">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
          <LeaderboardTable rankings={players} showFull={true} />
        </div>
      )}

      {/* Host Controls Panel Bar */}
      <div className="glass-panel-glow p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4 border border-purple-500/40">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white disabled:opacity-40"
            title="Previous Question"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={handlePauseResume}
            className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center gap-1.5"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={handleExtendTimer}
            className="px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-amber-300 font-bold text-xs flex items-center gap-1 border border-white/10"
          >
            <Clock className="w-4 h-4" /> +10s
          </button>

          <button
            onClick={handleRestartQuestion}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white"
            title="Restart Question"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleEndGame}
            className="px-4 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/30"
          >
            End Game
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base shadow-lg shadow-emerald-500/30 flex items-center gap-2 active:scale-95 transition-transform"
          >
            {state === 'QUESTION' && 'Reveal Answer'}
            {state === 'REVEAL' && 'View Scoreboard'}
            {state === 'LEADERBOARD' && (currentQuestionIndex + 1 < totalQuestions ? 'Next Question' : 'View Final Podium')}
            {state !== 'QUESTION' && state !== 'REVEAL' && state !== 'LEADERBOARD' && 'Next'}
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Optional Host Play as Host Answering Panel */}
      {hostRoomState.settings?.playAsHost && state === 'QUESTION' && (
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Host Participant Input
          </div>
          {currentQuestion?.options && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={hostAnswer !== null}
                  onClick={() => submitHostAnswer(idx)}
                  className={`p-3 rounded-xl font-bold text-sm transition-all border ${
                    hostAnswer === idx ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
