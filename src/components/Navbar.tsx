import { Copy, Check, Volume2, VolumeX, MessageSquare, ShieldAlert } from 'lucide-react';
import React, { useState } from 'react';
import { DISCORD_INVITE, SERVER_IP } from '../data/gamingData';
import { getSoundEnabled, playClickSound, toggleSound } from '../utils/sound';

interface NavbarProps {
  onCopyIp: () => void;
  playersOnline: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onCopyIp, playersOnline }) => {
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    onCopyIp();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#141210ee] border-b-4 border-[#3d3d3d] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#388e3c] border-2 border-white flex items-center justify-center shadow-[4px_4px_0px_#111]">
            <span className="text-2xl animate-bounce">💎</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wider text-emerald-400 drop-shadow-[2px_2px_0_#000]">
              PIXEL REALMS
            </h1>
            <p className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>{playersOnline.toLocaleString()} MINERS ONLINE</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Server IP Copy Box */}
          <button
            onClick={handleCopy}
            className={`mc-button px-3 py-1.5 flex items-center gap-2 text-sm md:text-base font-pixel ${
              copied ? 'mc-button-green' : ''
            }`}
            title="Click to copy server IP"
          >
            <span className="text-amber-300 font-bold">{SERVER_IP}</span>
            {copied ? (
              <Check className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Copy className="w-4 h-4 text-gray-200" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="mc-button p-2"
            title={soundOn ? "Mute 8-Bit Retro SFX" : "Unmute 8-Bit Retro SFX"}
            aria-label="Toggle retro sound effects"
          >
            {soundOn ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-red-400" />
            )}
          </button>

          {/* Discord Join */}
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="mc-button bg-[#5865F2] border-[#7983f5] text-white px-3 py-1.5 flex items-center gap-2 text-sm md:text-base hidden sm:flex"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>DISCORD</span>
          </a>
        </div>

      </div>
    </header>
  );
};
