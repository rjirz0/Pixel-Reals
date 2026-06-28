import { Scroll, Heart, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import { NEWS_ITEMS } from '../data/gamingData';
import { playClickSound } from '../utils/sound';

export const NewsSection: React.FC = () => {
  const [likes, setLikes] = useState<{ [id: string]: number }>(
    NEWS_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );

  const handleLike = (id: string) => {
    playClickSound();
    setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <section className="py-16 px-4 bg-stone-pattern border-t-8 border-[#222]">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center gap-3 mb-10">
          <Scroll className="w-8 h-8 text-amber-400" />
          <h2 className="text-3xl md:text-5xl font-bold text-white font-pixel tracking-wide uppercase drop-shadow-[3px_3px_0_#000]">
            PATCH NOTES & CHRONICLES
          </h2>
        </div>

        <div className="space-y-6">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="mc-panel p-6 md:p-8 shadow-[6px_6px_0px_#111] relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-[#888] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`font-pixel text-xs px-2 py-0.5 text-white ${
                    item.category === 'UPDATE' ? 'bg-blue-600' :
                    item.category === 'EVENT' ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-gray-700 font-bold">{item.date}</span>
                </div>
                <span className="text-xs font-mono text-gray-800">
                  Posted by <strong className="text-black">{item.author}</strong>
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-950 font-pixel mb-3">
                {item.title}
              </h3>

              <p className="text-gray-900 leading-relaxed text-base md:text-lg mb-6 font-mono">
                {item.summary}
              </p>

              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => handleLike(item.id)}
                  className="mc-button bg-[#388e3c] px-3 py-1 text-xs flex items-center gap-1.5 active:scale-95"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>GG ({likes[item.id]})</span>
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
