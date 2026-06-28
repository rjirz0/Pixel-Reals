import { Pickaxe, Shield, Swords, Sparkles, Copy } from 'lucide-react';
import React from 'react';
import { SERVER_IP } from '../data/gamingData';
import { playClickSound } from '../utils/sound';

interface HeroProps {
  onPlayClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayClick }) => {
  return (
    <section className="relative py-12 md:py-20 px-4 bg-dirt-pattern border-b-8 border-[#1f1f1f] shadow-2xl overflow-hidden">
      
      {/* Decorative Floating Pixel Blocks Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">🟩</div>
        <div className="absolute bottom-10 right-20 text-7xl animate-bounce">🟫</div>
        <div className="absolute top-1/2 right-10 text-5xl animate-pulse">🪨</div>
        <div className="absolute bottom-20 left-1/4 text-6xl animate-bounce">🪙</div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Tag Badge */}
        <div className="inline-flex items-center gap-2 bg-[#2b2b2b] border-2 border-[#555] px-4 py-1.5 shadow-[4px_4px_0px_#000] mb-6">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          <span className="text-sm md:text-base text-yellow-300 font-pixel tracking-wide">
            v2.4 NETHER BASTION UPDATE LIVE
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-wider uppercase mb-6 leading-tight drop-shadow-[4px_4px_0_#111]">
          CRAFT & <span className="text-emerald-400 underline decoration-amber-500 decoration-4">CONQUER</span> THE REALMS
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-amber-100 max-w-3xl mx-auto mb-10 drop-shadow-[2px_2px_0_#000] leading-relaxed">
          The ultimate retro multiplayer sandbox experience. Forge alliances, automate colossal redstone factories, and dominate the weekly blood moon PvP tournaments.
        </p>

        {/* Big CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => {
              playClickSound();
              onPlayClick();
            }}
            className="mc-button-green px-8 py-4 text-xl md:text-2xl font-bold w-full sm:w-auto flex items-center justify-center gap-3 shadow-[6px_6px_0px_#051c07] hover:scale-105 transition-transform"
          >
            <Swords className="w-7 h-7 animate-pulse" />
            <span>JOIN SERVER NOW</span>
          </button>

          <a
            href="#crafting-playground"
            onClick={playClickSound}
            className="mc-panel px-6 py-4 text-xl md:text-2xl font-bold w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-[6px_6px_0px_#111] hover:bg-white transition-colors"
          >
            <Pickaxe className="w-6 h-6 text-gray-800" />
            <span>TRY CRAFTING BENCH</span>
          </a>
        </div>

        {/* Quick Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t-4 border-[#3a2712]">
          <div className="bg-[#1e140aee] p-3 border-2 border-[#5c4021] text-center shadow-md">
            <span className="text-2xl block mb-1">⚡</span>
            <span className="text-sm font-bold text-emerald-300 block">20.00 TPS</span>
            <span className="text-xs text-gray-400">Zero Block Lag</span>
          </div>
          <div className="bg-[#1e140aee] p-3 border-2 border-[#5c4021] text-center shadow-md">
            <span className="text-2xl block mb-1">🛡️</span>
            <span className="text-sm font-bold text-amber-300 block">Anti-Cheat</span>
            <span className="text-xs text-gray-400">Fair Play Shield</span>
          </div>
          <div className="bg-[#1e140aee] p-3 border-2 border-[#5c4021] text-center shadow-md">
            <span className="text-2xl block mb-1">💰</span>
            <span className="text-sm font-bold text-cyan-300 block">Player Shop</span>
            <span className="text-xs text-gray-400">Dynamic Market</span>
          </div>
          <div className="bg-[#1e140aee] p-3 border-2 border-[#5c4021] text-center shadow-md">
            <span className="text-2xl block mb-1">🎉</span>
            <span className="text-sm font-bold text-pink-300 block">Vote Rewards</span>
            <span className="text-xs text-gray-400">Free Daily Crates</span>
          </div>
        </div>

      </div>
    </section>
  );
};
