import React, { useState, useEffect } from 'react';
import { CraftingBench } from './components/CraftingBench';
import { Footer } from './components/Footer';
import { GameModes } from './components/GameModes';
import { Hero } from './components/Hero';
import { Leaderboard } from './components/Leaderboard';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { Navbar } from './components/Navbar';
import { NewsSection } from './components/NewsSection';
import { ServerStatus } from './components/ServerStatus';
import { SERVER_IP } from './data/gamingData';
import { playPlaceSound } from './utils/sound';

export default function App() {
  const [playersOnline, setPlayersOnline] = useState(1420);
  const [showJoinToast, setShowJoinToast] = useState(false);
  const [selectedRealmName, setSelectedRealmName] = useState<string | null>(null);

  // Simulate live player counter fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return Math.max(1200, prev + delta);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerJoin = (realm?: string) => {
    navigator.clipboard.writeText(SERVER_IP);
    setSelectedRealmName(realm || 'Hardcore SMP Survival');
    setShowJoinToast(true);
    setTimeout(() => setShowJoinToast(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        playersOnline={playersOnline}
        onCopyIp={() => playPlaceSound()}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onPlayClick={() => handleTriggerJoin()} />

        {/* Server Status Indicators */}
        <ServerStatus />

        {/* Lead Capture Registration Form for Beta Access */}
        <LeadCaptureForm />

        {/* Interactive Centerpiece: 3x3 Crafting Bench */}
        <CraftingBench />

        {/* Game Modes Cards */}
        <GameModes onSelectMode={(mode) => handleTriggerJoin(mode)} />

        {/* News & Updates */}
        <NewsSection />

        {/* Hall of Fame Leaderboard */}
        <Leaderboard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Join Notification Modal/Toast */}
      {showJoinToast && (
        <div className="fixed bottom-6 right-6 z-50 mc-panel p-5 border-4 border-emerald-500 shadow-[8px_8px_0px_#000] max-w-sm animate-bounce">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚔️</span>
            <div>
              <h4 className="font-pixel font-bold text-sm text-emerald-950 uppercase">
                READY TO CONQUER!
              </h4>
              <p className="text-xs text-gray-800 font-mono">
                Selected Realm: <strong>{selectedRealmName}</strong>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-900 font-mono mb-3 bg-white/60 p-2 border border-gray-400">
            Server IP <strong className="text-black bg-amber-200 px-1">{SERVER_IP}</strong> copied to clipboard! Open your Minecraft launcher (Java 1.8.9 - 1.20) and click <strong>Multiplayer ➔ Direct Connect</strong>.
          </p>
          <button
            onClick={() => setShowJoinToast(false)}
            className="mc-button w-full py-1.5 text-xs font-bold"
          >
            DISMISS
          </button>
        </div>
      )}

    </div>
  );
}
