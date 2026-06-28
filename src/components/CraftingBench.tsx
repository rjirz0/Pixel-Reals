import confetti from 'canvas-confetti';
import { Sparkles, Trash2, HelpCircle, Award, CheckCircle2 } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { MATERIALS, RECIPES } from '../data/gamingData';
import { Material, Recipe } from '../types';
import { playClickSound, playCraftSuccessSound, playPlaceSound } from '../utils/sound';

export const CraftingBench: React.FC = () => {
  // Selected ingredient held in hand
  const [selectedMat, setSelectedMat] = useState<Material | null>(MATERIALS[0]);
  
  // 3x3 grid state (array of 9 material IDs or null)
  const [grid, setGrid] = useState<(string | null)[]>(Array(9).fill(null));
  
  // Unlocked achievements list
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  
  // Recipe book modal/view
  const [showGuide, setShowGuide] = useState(false);

  // Check matching recipe
  const matchedRecipe = useMemo(() => {
    return RECIPES.find((recipe) => {
      // Compare grid arrays
      return recipe.pattern.every((expectedId, idx) => grid[idx] === expectedId);
    });
  }, [grid]);

  // Handle slot click
  const handleSlotClick = (index: number) => {
    playPlaceSound();
    setGrid((prev) => {
      const next = [...prev];
      if (next[index] === selectedMat?.id) {
        // Toggle off if clicking exact same material
        next[index] = null;
      } else {
        next[index] = selectedMat ? selectedMat.id : null;
      }
      return next;
    });
  };

  // Clear grid
  const handleClear = () => {
    playClickSound();
    setGrid(Array(9).fill(null));
  };

  // Auto load recipe
  const handleLoadRecipe = (recipe: Recipe) => {
    playPlaceSound();
    setGrid([...recipe.pattern]);
    setShowGuide(false);
  };

  // Handle crafting claim
  const handleCraft = () => {
    if (!matchedRecipe) return;

    playCraftSuccessSound();

    // Trigger sweet confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (!unlockedAchievements.includes(matchedRecipe.achievement)) {
      setUnlockedAchievements((prev) => [matchedRecipe.achievement, ...prev]);
    }

    // Reset grid after crafting
    setTimeout(() => {
      setGrid(Array(9).fill(null));
    }, 400);
  };

  return (
    <section id="crafting-playground" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-amber-400 font-pixel tracking-wide uppercase drop-shadow-[3px_3px_0_#000] mb-3">
          INTERACTIVE CRAFTING BENCH
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
          Select materials from your inventory and arrange them on the 3x3 crafting grid. Craft legendary gear to unlock homepage achievements!
        </p>
      </div>

      {/* Main Crafting Container */}
      <div className="mc-panel p-6 md:p-8 shadow-[8px_8px_0px_#111] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Material Inventory (Cols 1-5) */}
        <div className="lg:col-span-5 bg-[#8b8b8b] p-4 border-4 border-[#373737] shadow-inner">
          <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-[#555]">
            <h3 className="font-pixel text-lg font-bold text-gray-900">INVENTORY ({MATERIALS.length})</h3>
            <button
              onClick={() => {
                playClickSound();
                setShowGuide(!showGuide);
              }}
              className="mc-button bg-[#388e3c] px-2 py-1 text-xs flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showGuide ? "HIDE GUIDE" : "RECIPE BOOK"}</span>
            </button>
          </div>

          <p className="text-xs text-gray-800 font-mono mb-3">
            Click an item to hold in cursor: <strong className="text-black underline">{selectedMat?.name || 'None'}</strong>
          </p>

          <div className="grid grid-cols-5 gap-2.5">
            {MATERIALS.map((mat) => {
              const isSelected = selectedMat?.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedMat(mat);
                  }}
                  className={`mc-slot w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center relative transition-transform ${
                    isSelected ? 'ring-4 ring-yellow-300 scale-110 z-10' : ''
                  }`}
                  title={`${mat.name} (${mat.rarity.toUpperCase()})`}
                >
                  <span className="text-2xl md:text-3xl select-none">{mat.icon}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Recipe Guide Panel if opened */}
          {showGuide && (
            <div className="mt-4 pt-4 border-t-2 border-[#555] bg-[#727272] p-3 border-2 border-white text-white">
              <h4 className="font-pixel text-sm font-bold text-yellow-300 mb-2">QUICK RECIPES:</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {RECIPES.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between bg-[#2b2b2b] p-1.5 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span>{rec.outputIcon}</span>
                      <span className="font-bold">{rec.outputName}</span>
                    </span>
                    <button
                      onClick={() => handleLoadRecipe(rec)}
                      className="mc-button bg-blue-600 px-2 py-0.5 text-[10px]"
                    >
                      AUTO-FILL
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MIDDLE: 3x3 Crafting Grid (Cols 6-8) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#a8a8a8] p-6 border-4 border-[#555] shadow-inner">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="font-pixel text-sm font-bold text-gray-900">3x3 CRAFTING</span>
            <button
              onClick={handleClear}
              className="text-xs text-red-800 hover:text-red-950 font-bold flex items-center gap-1 cursor-pointer"
              title="Clear Crafting Table"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR</span>
            </button>
          </div>

          {/* 3x3 Slots */}
          <div className="grid grid-cols-3 gap-2 bg-[#727272] p-3 border-4 border-[#373737] shadow-lg">
            {grid.map((matId, idx) => {
              const matObj = MATERIALS.find((m) => m.id === matId);
              return (
                <button
                  key={idx}
                  onClick={() => handleSlotClick(idx)}
                  className="mc-slot w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl select-none relative"
                >
                  {matObj ? matObj.icon : ''}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-700 mt-3 text-center">
            Click grid slots to insert <strong className="text-black">{selectedMat?.name}</strong>
          </p>
        </div>

        {/* RIGHT: Output Result (Cols 9-12) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center bg-[#8b8b8b] p-6 border-4 border-[#373737] h-full">
          <span className="font-pixel text-sm font-bold text-gray-900 mb-4">RESULT</span>
          
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-800">➔</span>
            
            {/* Output Slot */}
            <button
              onClick={handleCraft}
              disabled={!matchedRecipe}
              className={`mc-slot w-20 h-20 flex flex-col items-center justify-center relative transition-all ${
                matchedRecipe
                  ? 'ring-4 ring-emerald-400 bg-emerald-800/30 animate-pulse cursor-pointer shadow-[0_0_20px_#4ade80]'
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {matchedRecipe ? (
                <>
                  <span className="text-4xl select-none">{matchedRecipe.outputIcon}</span>
                  <span className="absolute bottom-1 right-1 font-pixel text-xs bg-black/80 text-white px-1">
                    {matchedRecipe.outputCount}
                  </span>
                </>
              ) : (
                <span className="text-xs text-gray-600 font-mono text-center px-1">No Recipe</span>
              )}
            </button>
          </div>

          {matchedRecipe ? (
            <div className="mt-4 text-center">
              <span className="text-sm font-bold text-emerald-950 font-pixel block">
                {matchedRecipe.outputName}
              </span>
              <p className="text-xs text-gray-800 leading-tight mt-1">
                {matchedRecipe.description}
              </p>
              <button
                onClick={handleCraft}
                className="mc-button-green mt-3 px-4 py-2 text-xs font-bold w-full animate-bounce"
              >
                CLICK TO CRAFT & CLAIM!
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-700 mt-6 text-center">
              Arrange items on grid or use the <strong className="text-black">Recipe Book</strong>!
            </p>
          )}
        </div>

      </div>

      {/* Achievements Toast / Drawer */}
      {unlockedAchievements.length > 0 && (
        <div className="mt-8 mc-panel-dark p-4 border-2 border-yellow-500 max-w-2xl mx-auto flex items-center gap-3 shadow-xl">
          <Award className="w-8 h-8 text-yellow-400 shrink-0 animate-spin" />
          <div className="w-full">
            <h4 className="text-yellow-300 font-pixel text-sm flex items-center justify-between">
              <span>HOMEPAGE ACHIEVEMENTS UNLOCKED ({unlockedAchievements.length}/6)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {unlockedAchievements.map((ach, i) => (
                <span key={i} className="bg-black/60 border border-yellow-600 px-2 py-0.5 text-xs text-amber-200">
                  ⭐ {ach}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
