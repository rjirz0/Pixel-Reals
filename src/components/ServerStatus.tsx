import { Activity, Server, Cpu, HardDrive, Wifi, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';

export const ServerStatus: React.FC = () => {
  const [pinging, setPinging] = useState(false);
  const [pingLatency, setPingLatency] = useState<number | null>(18);

  const handleTestPing = () => {
    playClickSound();
    setPinging(true);
    setPingLatency(null);
    setTimeout(() => {
      // Random ping between 11ms and 29ms
      const val = Math.floor(Math.random() * 18) + 11;
      setPingLatency(val);
      setPinging(false);
    }, 800);
  };

  return (
    <section className="py-12 px-4 bg-[#141210] border-t-4 border-b-4 border-[#3d3d3d]">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-white font-pixel flex items-center gap-3">
              <Server className="w-8 h-8 text-emerald-400" />
              <span>REAL-TIME SERVER STATUS</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Cluster Node: <span className="text-amber-400 font-mono">us-east-1.pixelrealms.node</span>
            </p>
          </div>

          <button
            onClick={handleTestPing}
            disabled={pinging}
            className="mc-button px-4 py-2 text-sm flex items-center gap-2 self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${pinging ? 'animate-spin text-yellow-400' : 'text-emerald-400'}`} />
            <span>{pinging ? "PINGING NODE..." : "TEST CONNECTION PING"}</span>
          </button>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Status Online */}
          <div className="mc-panel-dark p-5 border-2 border-emerald-500 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">CORE ENGINE</span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-400 font-pixel">ONLINE</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Latency: <strong className="text-white">{pingLatency ? `${pingLatency}ms` : '---'}</strong>
            </p>
          </div>

          {/* TPS */}
          <div className="mc-panel-dark p-5 border-2 border-[#555] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">TICK RATE</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold text-white font-pixel">20.00 TPS</span>
            </div>
            <div className="w-full bg-gray-700 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-full animate-pulse" />
            </div>
          </div>

          {/* RAM */}
          <div className="mc-panel-dark p-5 border-2 border-[#555] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">MEMORY ALLOCATION</span>
              <HardDrive className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold text-white font-pixel">48.2 GB</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Total Capacity: <span className="text-gray-300">64.0 GB DDR5</span>
            </p>
          </div>

          {/* CPU */}
          <div className="mc-panel-dark p-5 border-2 border-[#555] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">CPU LOAD</span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold text-white font-pixel">18.4%</span>
            </div>
            <p className="text-xs text-emerald-400 mt-2">
              Optimal Sandbox Temperatures
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
