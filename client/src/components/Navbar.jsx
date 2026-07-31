import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { soundEffects } from '../utils/soundEffects';
import { Volume2, VolumeX, Zap, LayoutDashboard, UserCheck, Play } from 'lucide-react';

export function Navbar() {
  const { isConnected, activeView, setActiveView } = useGame();
  const { user } = useAuth();
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEffects.isMuted = nextMute;
    if (!nextMute) soundEffects.playClick();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-70 bg-[#0b0819] border-b border-purple-900/30 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => { soundEffects.playClick(); setActiveView('HOME'); }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0b0819] rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Q-CLASH <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">PRO</span>
            </h1>
            <p className="text-[10px] text-purple-300 font-medium tracking-wider uppercase">Multiplayer Quiz Arena</p>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">

          {/* Connection Indicator */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            isConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
            {isConnected ? 'Server Live' : 'Connecting...'}
          </div>

          {/* Nav Buttons */}
          <button
            onClick={() => { soundEffects.playClick(); setActiveView('PLAYER_JOIN'); }}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'PLAYER_JOIN' 
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Play className="w-4 h-4" /> Join Game
          </button>

          <button
            onClick={() => { soundEffects.playClick(); setActiveView('HOST_DASHBOARD'); }}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'HOST_DASHBOARD' || activeView === 'QUIZ_EDITOR'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Host Dashboard
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 border border-white/10 transition-all active:scale-95"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-purple-400" />}
          </button>

          {/* Host user badge */}
          {user && (
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10 text-xs text-gray-300">
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span className="font-semibold text-purple-200">{user.name}</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
