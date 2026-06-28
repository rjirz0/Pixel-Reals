import { Trophy, Medal, Star } from 'lucide-react';
import React from 'react';
import { LEADERBOARD_PLAYERS } from '../data/gamingData';
import { playClickSound } from '../utils/sound';

export const Leaderboard: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-amber-400 font-pixel tracking-wide uppercase drop-shadow-[3px_3px_0_#000] flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <span>REALM HALL OF FAME</span>
        </h2>
        <p className="text-gray-400 mt-1 text-base md:text-lg">
          Top players of Season 14 across PvP kills and economy wealth.
        </p>
      </div>

      <div className="mc-panel-dark p-4 md:p-6 border-4 border-[#555] shadow-[8px_8px_0px_#000]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono border-collapse">
            <thead>
              <tr className="border-b-4 border-[#444] text-gray-400 text-xs md:text-sm uppercase">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Miner / Legend</th>
                <th className="py-3 px-4">Achievement Badge</th>
                <th className="py-3 px-4 text-right">Season Record</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#333]">
              {LEADERBOARD_PLAYERS.map((p) => {
                const isTop1 = p.rank === 1;
                return (
                  <tr
                    key={p.rank}
                    onClick={playClickSound}
                    className={`hover:bg-white/5 transition-colors cursor-pointer ${
                      isTop1 ? 'bg-amber-950/30 font-bold text-amber-200' : 'text-gray-200'
                    }`}
                  >
                    <td className="py-4 px-4 font-pixel text-lg md:text-xl">
                      {p.rank === 1 && <span className="text-yellow-400">#1 👑</span>}
                      {p.rank === 2 && <span className="text-gray-300">#2 🥈</span>}
                      {p.rank === 3 && <span className="text-amber-600">#3 🥉</span>}
                      {p.rank > 3 && <span className="text-gray-500">#{p.rank}</span>}
                    </td>
                    <td className="py-4 px-4 flex items-center gap-3">
                      <span className="text-2xl select-none">{p.avatar}</span>
                      <span className="font-bold text-base md:text-lg hover:underline decoration-emerald-400">
                        {p.username}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-[#222] border border-[#666] px-2.5 py-1 text-xs font-pixel tracking-wide text-emerald-300 inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-emerald-300" />
                        <span>{p.badge}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-emerald-400 text-base md:text-lg">
                      {p.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
