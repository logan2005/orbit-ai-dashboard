import React from 'react';
import { Terminal, Cpu, Activity, Lock, Database } from 'lucide-react';
import { TransparencyEvent } from '../../types';

interface SystemTransparencyProps {
  module: string;
  events: TransparencyEvent[];
}

export const SystemTransparency: React.FC<SystemTransparencyProps> = ({ module, events }) => {
  const filteredEvents = events.filter(e => e.module === module || module === 'LOGS');
  const latestConfidence = filteredEvents.length > 0 ? filteredEvents[0].confidence : 0.95;

  return (
    <div className="glass-panel p-6 rounded-xl border border-orbit-cyan/30 bg-orbit-950/80 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orbit-cyan/10 rounded-lg border border-orbit-cyan/30">
            <Cpu className="w-5 h-5 text-orbit-cyan animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">AI LOGIC KERNEL</h2>
            <p className="text-[10px] text-gray-400 font-mono uppercase">Transparency Mode: ACTIVE</p>
          </div>
        </div>
        <div className="text-right">
           <div className="text-2xl font-mono font-bold text-orbit-emerald">
             {(latestConfidence * 100).toFixed(1)}%
           </div>
           <div className="text-[9px] text-gray-500 uppercase tracking-widest">Confidence Score</div>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-black/40 p-3 rounded border border-white/5">
            <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3 h-3 text-orbit-amber" />
                <span className="text-[10px] text-gray-400 uppercase">Processing</span>
            </div>
            <span className="font-mono text-sm">12ms Latency</span>
        </div>
        <div className="bg-black/40 p-3 rounded border border-white/5">
            <div className="flex items-center gap-2 mb-1">
                <Database className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] text-gray-400 uppercase">Heuristics</span>
            </div>
            <span className="font-mono text-sm">Active</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 bg-black/60 rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col relative">
        <div className="absolute top-2 right-2 text-[10px] text-gray-600 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-orbit-emerald rounded-full animate-pulse"></div> LIVE STREAM
        </div>
        <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {filteredEvents.map((event) => (
                <div key={event.id} className="border-l-2 border-slate-700 pl-3 py-0.5 animate-in slide-in-from-left duration-300">
                    <div className="flex gap-2 text-[10px] text-gray-500 mb-0.5">
                        <span>[{event.timestamp}]</span>
                        <span className={`font-bold ${
                            event.type === 'ACTION' ? 'text-orbit-cyan' : 
                            event.type === 'DECISION' ? 'text-orbit-amber' : 'text-gray-400'
                        }`}>{event.type}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{event.detail}</p>
                </div>
            ))}
            {filteredEvents.length === 0 && (
                <div className="text-gray-600 italic">Waiting for system events...</div>
            )}
        </div>
        
        {/* Input Simulation */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-gray-500">
            <span className="text-orbit-cyan">root@orbit-ai:~$</span>
            <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};