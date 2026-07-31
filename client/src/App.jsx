import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { HostDashboard } from './components/Host/HostDashboard';
import { QuizEditor } from './components/Host/QuizEditor';
import { HostLobby } from './components/Host/HostLobby';
import { HostGameControl } from './components/Host/HostGameControl';
import { JoinRoom } from './components/Player/JoinRoom';
import { PlayerLobby } from './components/Player/PlayerLobby';
import { PlayerQuestionView } from './components/Player/PlayerQuestionView';
import { PlayerScoreView } from './components/Player/PlayerScoreView';
import { soundEffects } from './utils/soundEffects';
import { Zap, Play, LayoutDashboard, Sparkles, ShieldCheck, Trophy, Radio, Music } from 'lucide-react';

function HomeView() {
  const { setActiveView } = useGame();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 flex flex-col gap-12 py-12">
      
      {/* Hero Showcase */}
      <div className="glass-panel-glow p-8 sm:p-16 rounded-[40px] border border-purple-500/40 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
        
        {/* Background glow orb */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-600/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-spin" /> Live Real-Time Multiplayer Quiz Engine
        </div>

        <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl">
          Clash in Real-Time <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300">
            Multiplayer Quiz Battles
          </span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl font-medium">
          Create custom quizzes, launch room codes, sync audio FX, and compete on dynamic live podiums with zero installation needed for players!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => { soundEffects.playClick(); setActiveView('PLAYER_JOIN'); }}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-black text-xl shadow-2xl shadow-purple-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Play className="w-6 h-6 fill-white" /> Join Game with Code
          </button>

          <button
            onClick={() => { soundEffects.playClick(); setActiveView('HOST_DASHBOARD'); }}
            className="px-10 py-5 rounded-2xl glass-panel hover:bg-white/10 text-white font-extrabold text-xl border border-white/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <LayoutDashboard className="w-6 h-6 text-purple-400" /> Host a Quiz
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center font-black">
            <Radio className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Socket.IO Sync</h3>
          <p className="text-gray-400 text-sm">Ultra-low latency question delivery, instant answers, live room code lobby, and score sync.</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-600/30 text-pink-300 border border-pink-500/40 flex items-center justify-center font-black">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">10+ Question Types</h3>
          <p className="text-gray-400 text-sm">Multiple choice, multi-select, True/False, polls, sliders, type answer, ordering puzzles & blanks!</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600/30 text-amber-300 border border-amber-500/40 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Play as Host Mode</h3>
          <p className="text-gray-400 text-sm">Host can optional join as a participant, submit answers, and earn points on the live leaderboard.</p>
        </div>
      </div>

    </div>
  );
}

function MainContent() {
  const { activeView, hostRoomState, playerRoomState } = useGame();

  // Dynamic View Switcher
  switch (activeView) {
    case 'HOST_DASHBOARD':
      return <HostDashboard />;
    case 'QUIZ_EDITOR':
      return <QuizEditor />;
    case 'HOST_LOBBY':
      return <HostLobby />;
    case 'HOST_GAME':
      return <HostGameControl />;
    case 'PLAYER_JOIN':
      return <JoinRoom />;
    case 'PLAYER_LOBBY':
      return <PlayerLobby />;
    case 'PLAYER_GAME':
      return (playerRoomState && (playerRoomState.state === 'REVEAL' || playerRoomState.state === 'LEADERBOARD')) 
        ? <PlayerScoreView /> 
        : <PlayerQuestionView />;
    default:
      // If player is connected in a live room, prioritize room view!
      if (playerRoomState) {
        if (playerRoomState.state === 'LOBBY') return <PlayerLobby />;
        if (playerRoomState.state === 'REVEAL' || playerRoomState.state === 'LEADERBOARD') return <PlayerScoreView />;
        return <PlayerQuestionView />;
      }
      if (hostRoomState) {
        if (hostRoomState.state === 'LOBBY') return <HostLobby />;
        return <HostGameControl />;
      }
      return <HomeView />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <MainContent />
          </main>
          <footer className="py-6 text-center text-xs text-purple-300/60 border-t border-purple-900/20 mt-12">
            ⚡ Q-Clash Pro Multiplayer Arena • Ready to run locally with zero dependencies
          </footer>
        </div>
      </GameProvider>
    </AuthProvider>
  );
}
