import { Users, ArrowRight } from 'lucide-react';
import React from 'react';
import { GAME_MODES, SERVER_IP } from '../data/gamingData';
import { playClickSound } from '../utils/sound';

interface GameModesProps {
  onSelectMode: (modeTitle: string) => void;
}

export const GameModes: React.FC<GameModesProps> = ({ onSelectMode }) => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white font-pixel tracking-wider uppercase drop-shadow-[3px_3px_0_#111]">
          EXPLORE OUR <span className="text-amber-400">GAME REALMS</span>
        </h2>
        <p className="text-gray-400 text-lg mt-2 max-w-2xl mx-auto">
          From peaceful economy sky islands to high-stakes obsidian bed battles. Choose your destiny.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {GAME_MODES.map((mode) => (
          <div
            key={mode.id}
            className="mc-panel-dark flex flex-col justify-between p-6 border-4 border-[#3d3d3d] hover:border-amber-500 transition-all shadow-[6px_6px_0px_#000] group"
          >
            <div>
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl p-2 bg-[#1a1614] border-2 border-white/20 shadow-md group-hover:scale-110 transition-transform">
                  {mode.icon}
                </span>
                <span
                  className="font-pixel text-[10px] px-2 py-1 font-bold text-black shadow-sm"
                  style={{ backgroundColor: mode.accentColor }}
                >
                  {mode.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white font-pixel mb-2 group-hover:text-amber-300 transition-colors">
                {mode.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {mode.description}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t-2 border-[#3d3d3d]">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Users className="w-4 h-4" />
                  <span>{mode.playersOnline} Online</span>
                </span>
                <span>{mode.version}</span>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  onSelectMode(mode.title);
                }}
                className="mc-button w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-amber-600 transition-colors"
              >
                <span>JOIN REALM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
