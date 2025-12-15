import React, { useState } from 'react';
import { Lightbulb, User, PowerOff, AlertTriangle, Zap, Fan, Tv, Video } from 'lucide-react';
import { Card, Badge } from '../ui/Card';
import { RoomStatus } from '../../types';

interface EnergyGridProps {
  rooms: RoomStatus[];
  totalSavings: number;
}

const RoomCard: React.FC<{ room: RoomStatus; onFocus: () => void; isFocused: boolean }> = ({ room, onFocus, isFocused }) => {
    return (
        <div 
            onClick={onFocus}
            className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
              room.status === 'WASTAGE' 
                ? 'bg-rose-950/20 border-rose-500/50 hover:bg-rose-950/30' 
                : room.status === 'OPTIMAL' 
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/30' 
                  : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50'
            } ${isFocused ? 'ring-2 ring-orbit-cyan scale-[1.02]' : ''}`}
        >
            {/* Ambient Glow */}
            <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-[40px] opacity-30 transition-colors duration-500 ${
               room.status === 'WASTAGE' ? 'bg-rose-500' : 
               room.status === 'OPTIMAL' ? 'bg-emerald-500' : 'bg-transparent'
            }`}></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-gray-200 text-sm">{room.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-gray-500 uppercase">{room.source} POWER</span>
                            {room.source === 'SOLAR' && <Zap className="w-3 h-3 text-orbit-amber fill-orbit-amber" />}
                        </div>
                    </div>
                    {room.status === 'WASTAGE' && (
                        <div className="flex relative">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                             <AlertTriangle className="w-4 h-4 text-rose-500 relative z-10" />
                        </div>
                    )}
                </div>

                {/* Metrics */}
                <div className="flex items-end justify-between mt-4">
                     <div className="flex items-center gap-2">
                         <span className="text-2xl font-mono font-bold text-white">{room.powerConsumption.toFixed(2)}</span>
                         <span className="text-xs text-gray-400 mb-1">kW</span>
                     </div>
                     <div className="flex gap-1">
                        {room.devices.map((dev, i) => (
                            <div key={i} className={`p-1.5 rounded-md ${dev.status === 'ON' ? 'bg-white/10 text-white' : 'bg-black/20 text-gray-600'}`}>
                                {dev.type === 'HVAC' && <Fan className={`w-3 h-3 ${dev.status === 'ON' ? 'animate-spin' : ''}`} />}
                                {dev.type === 'LIGHT' && <Lightbulb className="w-3 h-3" />}
                                {dev.type === 'MISC' && <Tv className="w-3 h-3" />}
                            </div>
                        ))}
                     </div>
                </div>

                {/* Footer Badges */}
                <div className="mt-3 flex justify-between items-center border-t border-white/5 pt-2">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${room.isOccupied ? 'text-orbit-cyan' : 'text-rose-400'}`}>
                        <User className="w-3 h-3" />
                        {room.isOccupied ? 'Occupied' : 'Empty'}
                    </div>
                    {room.status === 'OFF' && <Badge variant="neutral">Offline</Badge>}
                    {room.status === 'OPTIMAL' && <Badge variant="success">Efficient</Badge>}
                    {room.status === 'WASTAGE' && <Badge variant="danger">Wastage</Badge>}
                </div>
            </div>
        </div>
    );
};

export const EnergyGrid: React.FC<EnergyGridProps> = ({ rooms, totalSavings }) => {
  // Automatically select the first wastage room, or default to first
  const activeAlertRoom = rooms.find(r => r.status === 'WASTAGE');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  
  // Effect to auto-select alert room if one appears and nothing is manually selected
  React.useEffect(() => {
      if(activeAlertRoom && !selectedRoomId) {
          setSelectedRoomId(activeAlertRoom.id);
      }
  }, [activeAlertRoom, selectedRoomId]);

  const focusedRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : (activeAlertRoom || rooms[0]);

  return (
    <div className="flex gap-6 h-full">
        {/* Left: Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto pr-2">
            {rooms.map(room => (
                <RoomCard 
                    key={room.id} 
                    room={room} 
                    isFocused={focusedRoom?.id === room.id}
                    onFocus={() => setSelectedRoomId(room.id)}
                />
            ))}
        </div>

        {/* Right: Live Monitor Panel */}
        <div className="w-1/3 flex flex-col gap-4">
            <Card title="Live Anomaly Feed" icon={<Video className="w-5 h-5" />} className="h-full flex flex-col">
                {focusedRoom ? (
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Feed Window */}
                        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-slate-700 group">
                             <img 
                                src={focusedRoom.camFeed || "https://picsum.photos/400/300?grayscale&blur=2"} 
                                alt="Room Feed" 
                                className={`w-full h-full object-cover transition-opacity duration-300 ${focusedRoom.status === 'OFF' ? 'opacity-20' : 'opacity-80'}`}
                             />
                             
                             {/* Overlays */}
                             <div className="absolute top-2 left-2 flex items-center gap-2">
                                <div className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">LIVE</div>
                                <span className="text-[10px] font-mono text-white/80 bg-black/50 px-1 rounded">{focusedRoom.name} CAM_01</span>
                             </div>

                             {focusedRoom.status === 'WASTAGE' && (
                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                     <div className="w-full h-full border-4 border-rose-500/50 animate-pulse absolute"></div>
                                     <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg border border-rose-500/50 flex flex-col items-center">
                                         <AlertTriangle className="w-8 h-8 text-rose-500 mb-1" />
                                         <span className="text-rose-500 font-bold uppercase text-xs">Anomaly Detected</span>
                                         <span className="text-gray-300 text-[10px]">Unoccupied Power Usage</span>
                                     </div>
                                 </div>
                             )}

                             {/* AI Analysis Overlay */}
                             <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2 flex justify-between items-center border-t border-white/10">
                                 <div className="flex flex-col">
                                     <span className="text-[9px] text-gray-400 uppercase">Occupancy</span>
                                     <span className={`text-xs font-bold ${focusedRoom.isOccupied ? 'text-emerald-400' : 'text-rose-400'}`}>
                                         {focusedRoom.isOccupied ? 'DETECTED' : 'NONE'}
                                     </span>
                                 </div>
                                 <div className="flex flex-col text-right">
                                     <span className="text-[9px] text-gray-400 uppercase">Active Load</span>
                                     <span className="text-xs font-mono font-bold text-white">{focusedRoom.powerConsumption.toFixed(1)} kW</span>
                                 </div>
                             </div>
                        </div>

                        {/* Controls / Info */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-gray-400 uppercase">Device Status</h4>
                            <div className="space-y-1">
                                {focusedRoom.devices.map((dev, i) => (
                                    <div key={i} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5 text-xs">
                                        <div className="flex items-center gap-2">
                                            {dev.type === 'HVAC' && <Fan className="w-3 h-3 text-gray-400" />}
                                            {dev.type === 'LIGHT' && <Lightbulb className="w-3 h-3 text-gray-400" />}
                                            {dev.type === 'MISC' && <Zap className="w-3 h-3 text-gray-400" />}
                                            <span className="text-gray-200">{dev.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-gray-500">{dev.power} kW</span>
                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                                dev.status === 'ON' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                                            }`}>{dev.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {focusedRoom.status === 'WASTAGE' && (
                             <button className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-lg shadow-rose-900/20">
                                 Trigger Remote Shutdown
                             </button>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-xs uppercase tracking-widest">
                        Select a room
                    </div>
                )}
            </Card>
        </div>
    </div>
  );
};