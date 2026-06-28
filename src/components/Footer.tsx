import { ArrowUp, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import React from 'react';
import { DISCORD_INVITE, SERVER_IP, STORE_URL } from '../data/gamingData';
import { playClickSound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f0d0c] border-t-8 border-[#3d3d3d] text-gray-400 py-12 px-4 mt-12 relative select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b-2 border-[#222]">
        
        {/* Col 1 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🟩</span>
            <span className="font-pixel font-bold text-xl text-white">PIXEL REALMS</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 font-mono">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft. Built with retro passion for the pixel gaming community.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="md:text-center">
          <h4 className="font-pixel text-sm font-bold text-white uppercase mb-4 tracking-wider">REALM PORTALS</h4>
          <div className="flex flex-col gap-2.5 items-start md:items-center text-sm font-mono">
            <a href={STORE_URL} target="_blank" rel="noreferrer" onClick={playClickSound} className="hover:text-amber-400 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Official Web Store</span>
            </a>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" onClick={playClickSound} className="hover:text-blue-400 flex items-center gap-1.5">
              <span className="text-blue-400">💬</span>
              <span>Discord Community</span>
            </a>
            <a href="#crafting-playground" onClick={playClickSound} className="hover:text-emerald-400 flex items-center gap-1.5">
              <span className="text-emerald-400">⛏️</span>
              <span>Crafting Simulator</span>
            </a>
          </div>
        </div>

        {/* Col 3: Server IP */}
        <div className="md:text-right flex flex-col justify-between items-start md:items-end">
          <div>
            <h4 className="font-pixel text-sm font-bold text-white uppercase mb-2">CONNECT NOW</h4>
            <div className="bg-[#1f1f1f] border-2 border-[#444] px-3 py-1.5 inline-block font-pixel text-amber-300 text-sm">
              {SERVER_IP}
            </div>
            <p className="text-xs text-gray-500 mt-1">Version 1.8.9 - 1.20.4 Supported</p>
          </div>

          <button
            onClick={scrollToTop}
            className="mc-button mt-6 md:mt-0 px-4 py-2 text-xs font-bold flex items-center gap-2 active:scale-95"
            title="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600">
        <p>© 2026 PIXEL REALMS NETWORK. ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-1">
          <span>FORGED WITH</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>FOR RETRO SANDBOX GAMERS</span>
        </p>
      </div>
    </footer>
  );
};
