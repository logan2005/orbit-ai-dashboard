import React from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sun, Zap, BatteryCharging, Power } from 'lucide-react';
import { Card, Badge } from '../ui/Card';
import { SolarData } from '../../types';

interface SolarPanelProps {
  data: SolarData[];
}

export const SolarPanel: React.FC<SolarPanelProps> = ({ data }) => {
  const latest = data[data.length - 1];
  
  return (
    <Card title="Solar Intelligence" icon={<Sun className="w-5 h-5" />} className="h-full">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <p className="text-gray-400 text-[10px] uppercase mb-1">Solar Generation</p>
          <div className="flex items-end gap-2">
            <span className="text-xl font-mono font-bold text-orbit-amber">{latest?.actual.toFixed(1)}</span>
            <span className="text-[10px] text-gray-500 mb-1">kW</span>
          </div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <p className="text-gray-400 text-[10px] uppercase mb-1">Grid Draw</p>
          <div className="flex items-end gap-2">
            <span className="text-xl font-mono font-bold text-orbit-cyan">{latest?.gridUsage.toFixed(1)}</span>
            <span className="text-[10px] text-gray-500 mb-1">kW</span>
          </div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <p className="text-gray-400 text-[10px] uppercase mb-1">Battery Bank</p>
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span className="text-xl font-mono font-bold text-emerald-400">{latest?.batteryLevel}%</span>
          </div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <p className="text-gray-400 text-[10px] uppercase mb-1">Load Status</p>
          <Badge variant="success">Optimized</Badge>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '12px' }}/>
            <Area 
              type="monotone" 
              dataKey="actual" 
              name="Solar Output"
              stroke="#f59e0b" 
              fill="url(#colorSolar)" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="gridUsage" 
              name="Grid Usage (EB)"
              stroke="#06b6d4" 
              strokeWidth={2} 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              name="AI Prediction"
              stroke="#64748b" 
              strokeDasharray="3 3"
              strokeWidth={1} 
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-2">
        <span className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-orbit-cyan" />
            Load shifting logic active: High solar reduces grid dependency.
        </span>
      </div>
    </Card>
  );
};