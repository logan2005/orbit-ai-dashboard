import React from 'react';
import { Droplets, Activity, AlertTriangle, Settings, RefreshCw, ArrowDown, ArrowRight, Waves } from 'lucide-react';
import { Card, Badge } from '../ui/Card';
import { WaterTankData } from '../../types';

interface WaterMonitorProps {
  tanks: WaterTankData[];
}

const TankVisual: React.FC<{ tank: WaterTankData }> = ({ tank }) => {
  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

       <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h4 className="font-bold text-gray-200 text-sm">{tank.buildingName}</h4>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] text-gray-500 font-mono">CAP: {(tank.capacity/1000).toFixed(1)}kL</span>
               {tank.pumpStatus === 'MAINTENANCE' && <Badge variant="warning">Manual</Badge>}
            </div>
          </div>
          {tank.isLeaking && (
             <div className="animate-pulse bg-rose-500/20 p-1 rounded">
               <AlertTriangle className="w-4 h-4 text-rose-500" />
             </div>
          )}
       </div>

       <div className="flex gap-4 items-end relative z-10">
          {/* TANK GRAPHIC */}
          <div className="relative w-16 h-32 bg-slate-800/50 rounded-lg border border-slate-600 overflow-hidden shadow-inner">
              {/* Liquid */}
              <div 
                className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out border-t ${
                    tank.isLeaking ? 'bg-rose-500/60 border-rose-400' : 
                    tank.quality.turbidity > 5 ? 'bg-amber-600/60 border-amber-500' : 'bg-blue-500/60 border-blue-400'
                }`}
                style={{ height: `${tank.level}%` }}
              >
                  {/* Wave Animation */}
                  <div className="absolute top-0 left-0 w-[200%] h-2 bg-white/20 animate-[scan_3s_linear_infinite]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
              </div>
              
              {/* Level Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs font-bold font-mono text-white drop-shadow-md">{tank.level}%</span>
              </div>
          </div>

          {/* PLUMBING & PUMP VISUALIZATION */}
          <div className="flex-1 flex flex-col justify-end h-32 pb-2">
             
             {/* Inflow Pipe System */}
             <div className="flex items-center gap-2 mb-2">
                 <div className={`p-1.5 rounded-full border ${tank.pumpStatus === 'ON' ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700'}`}>
                    <RefreshCw className={`w-3 h-3 ${tank.pumpStatus === 'ON' ? 'text-emerald-400 animate-spin' : 'text-gray-600'}`} />
                 </div>
                 <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                    {/* Flow Animation */}
                    {tank.pumpStatus === 'ON' && (
                        <div className="absolute inset-0 bg-emerald-500/50 animate-[scan_1s_linear_infinite]" style={{ background: 'linear-gradient(90deg, transparent, #10b981, transparent)' }}></div>
                    )}
                 </div>
                 <span className="text-[9px] font-mono w-8 text-right text-gray-400">{tank.inflow} L/m</span>
             </div>

             {/* Outflow Pipe System */}
             <div className="flex items-center gap-2">
                 <div className="p-1.5 rounded-full border bg-slate-800 border-slate-700">
                    <ArrowDown className="w-3 h-3 text-blue-400" />
                 </div>
                 <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                     {/* Flow Animation */}
                     {tank.outflow > 0 && (
                        <div className="absolute inset-0 bg-blue-500/50 animate-[scan_1.5s_linear_infinite]" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }}></div>
                    )}
                 </div>
                 <span className="text-[9px] font-mono w-8 text-right text-gray-400">{tank.outflow} L/m</span>
             </div>
             
             {/* Status Text */}
             <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center">
                 <span className="text-[9px] text-gray-500 uppercase">Pump Status</span>
                 <span className={`text-[10px] font-bold ${
                     tank.pumpStatus === 'ON' ? 'text-emerald-400' : 
                     tank.pumpStatus === 'MAINTENANCE' ? 'text-amber-400' : 'text-gray-500'
                 }`}>
                     {tank.pumpStatus}
                 </span>
             </div>
          </div>
       </div>
    </div>
  )
}

export const WaterTank: React.FC<WaterMonitorProps> = ({ tanks }) => {
  return (
    <Card title="Water Resources Matrix" icon={<Droplets className="w-5 h-5" />} className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full overflow-y-auto pr-1">
         {tanks.map(tank => (
             <TankVisual key={tank.id} tank={tank} />
         ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-gray-500 border-t border-white/5 pt-2 px-2">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Pump Active</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Outflow</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-rose-500 rounded-full"></div> Leak</span>
         </div>
         <span className="font-mono">SYS_PRESSURE: 45 PSI</span>
      </div>
    </Card>
  );
};