import React, { useState, useEffect } from 'react';
import { ScanFace, Sparkles, AlertOctagon, Users, UserX, ShieldAlert, Eye, Target, Crosshair, Trash2, AlertTriangle, CheckCircle2, ScanLine } from 'lucide-react';
import { Card, Badge } from '../ui/Card';
import { SecurityFeed } from '../../types';

export const SecurityMatrix: React.FC<{ feeds: SecurityFeed[] }> = ({ feeds }) => {
  return (
    <Card title="Campus Surveillance Grid" icon={<Eye className="w-5 h-5" />} className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 h-full overflow-y-auto custom-scrollbar p-2">
        {feeds.map((feed) => (
          <div 
            key={feed.id} 
            className={`relative rounded-lg overflow-hidden border transition-all duration-300 group aspect-video ${
                feed.status === 'CRITICAL' ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 
                feed.status === 'WARNING' ? 'border-amber-500' : 'border-slate-700 bg-black'
            }`}
          >
            {/* Camera Feed Image - High Visibility */}
            <img 
                src={feed.camUrl} 
                alt={feed.location} 
                className={`w-full h-full object-cover transition-all duration-500 ${
                    feed.status === 'CRITICAL' ? 'opacity-100 grayscale-0' : 'opacity-80 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0'
                }`}
            />
            
            {/* Gradient Overlays for Text Readability */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>

            {/* Critical Flash Overlay */}
            {feed.status === 'CRITICAL' && (
                <div className="absolute inset-0 bg-rose-500/20 animate-pulse pointer-events-none">
                    <div className="absolute inset-0 border-4 border-rose-500/50"></div>
                </div>
            )}

            {/* Scanning Line Animation - More subtle */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[size:100%_4px]"></div>
            
            {/* Header Info */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                <div className="flex items-center gap-2">
                    <span className="bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5 shadow-lg">
                        <Crosshair className="w-3 h-3 text-orbit-cyan" />
                        CAM_{feed.id} • {feed.location}
                    </span>
                </div>

                {/* Alerts */}
                {feed.type === 'CLASSROOM' && !feed.staffDetected && feed.studentCount > 0 && (
                     <span className="bg-rose-600/90 text-[10px] font-bold text-white px-2 py-0.5 rounded animate-pulse flex items-center gap-1 w-fit shadow-lg shadow-rose-900/50 border border-rose-400">
                        <UserX className="w-3 h-3" /> STAFF MISSING
                     </span>
                )}
                 {feed.activity === 'FIGHTING' && (
                     <span className="bg-rose-600/90 text-[10px] font-bold text-white px-2 py-0.5 rounded animate-pulse flex items-center gap-1 w-fit shadow-lg shadow-rose-900/50 border border-rose-400">
                        <AlertOctagon className="w-3 h-3" /> CLASH DETECTED
                     </span>
                )}
                 {feed.activity === 'GATHERING' && feed.status === 'WARNING' && (
                     <span className="bg-amber-600/90 text-[10px] font-bold text-white px-2 py-0.5 rounded flex items-center gap-1 w-fit shadow-lg border border-amber-400">
                        <Users className="w-3 h-3" /> CROWD DENSITY HIGH
                     </span>
                )}
            </div>

            {/* Recording Indicator */}
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-white/5">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1s_ease-in-out_infinite]"></div>
                 <span className="text-[9px] font-mono text-white font-bold tracking-wider">LIVE</span>
            </div>

            {/* Bounding Box Simulations for Flagged Persons */}
            {feed.flaggedIndividuals > 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-amber-500/80 rounded-sm z-0 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    <div className="absolute -top-5 left-0 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5">MATCH: 98%</div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
                </div>
            )}

            {/* Bottom Stats Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end z-10">
                <div className="flex items-center gap-3">
                     <div className="flex flex-col">
                        <span className="text-[8px] text-gray-400 uppercase tracking-wider mb-0.5">Activity</span>
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 ${
                            feed.status === 'CRITICAL' ? 'text-rose-400 border-rose-500/30' :
                            feed.status === 'WARNING' ? 'text-amber-400 border-amber-500/30' : 'text-emerald-400 border-emerald-500/30'
                        }`}>{feed.activity}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[8px] text-gray-400 uppercase tracking-wider mb-0.5">Headcount</span>
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
                            <Users className="w-3 h-3 text-gray-300" />
                            <span className="text-[10px] font-mono text-white font-bold">{feed.studentCount}</span>
                        </div>
                     </div>
                </div>
                
                {/* Action Button */}
                {feed.status !== 'SAFE' && (
                     <button className={`text-[9px] font-bold uppercase px-3 py-1.5 rounded transition-all shadow-lg flex items-center gap-1.5 ${
                         feed.status === 'CRITICAL' 
                         ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40' 
                         : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40'
                     }`}>
                        <ShieldAlert className="w-3 h-3" />
                        {feed.status === 'CRITICAL' ? 'Dispatch Security' : 'Flag for Review'}
                     </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

interface Detection {
    x: number; // percentage
    y: number; // percentage
    w: number;
    h: number;
    label: string;
    confidence: number;
}

interface CleanlinessZoneData {
    id: string;
    name: string;
    image: string;
    status: 'CLEAN' | 'PENDING' | 'CRITICAL' | 'SCANNING';
    score: number;
    detections: Detection[];
}

const TrashPreview: React.FC<{ zone: CleanlinessZoneData }> = ({ zone }) => {
    return (
        <div className={`relative rounded-xl overflow-hidden border bg-black/40 group transition-all duration-300 ${
            zone.status === 'CRITICAL' ? 'border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]' :
            zone.status === 'PENDING' ? 'border-amber-500/60' :
            zone.status === 'SCANNING' ? 'border-orbit-cyan/60' :
            'border-emerald-500/30'
        }`}>
            {/* Image */}
            <div className="absolute inset-0">
                <img src={zone.image} alt={zone.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60"></div>
            </div>

            {/* Scanning Laser Effect */}
            <div className={`absolute left-0 w-full h-1 bg-orbit-cyan/50 shadow-[0_0_15px_#06b6d4] z-10 animate-scan ${
                zone.status === 'CLEAN' ? 'hidden' : ''
            }`}></div>
            
            {/* Grid Overlay for Tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            {/* Bounding Boxes for Detections */}
            {zone.detections.map((det, idx) => (
                <div 
                    key={idx}
                    className="absolute z-20 border-2 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse"
                    style={{ left: `${det.x}%`, top: `${det.y}%`, width: `${det.w}%`, height: `${det.h}%` }}
                >
                    <div className="absolute -top-6 left-0 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 whitespace-nowrap flex items-center gap-1">
                        <Trash2 className="w-3 h-3" />
                        {det.label} ({det.confidence}%)
                    </div>
                    {/* Corner Reticles */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white"></div>
                </div>
            ))}

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-30">
                <div className="flex items-center gap-2">
                    <span className="bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-gray-300">
                        CAM_{zone.id.toUpperCase()}
                    </span>
                    {zone.status === 'SCANNING' && (
                        <span className="text-[10px] font-bold text-orbit-cyan animate-pulse">ANALYZING...</span>
                    )}
                </div>
                <Badge variant={
                    zone.status === 'CLEAN' ? 'success' : 
                    zone.status === 'CRITICAL' ? 'danger' : 
                    zone.status === 'PENDING' ? 'warning' : 'neutral'
                }>
                    {zone.status}
                </Badge>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-black/60 backdrop-blur-sm z-30 flex justify-between items-center">
                 <div>
                     <h4 className="text-sm font-bold text-white">{zone.name}</h4>
                     <p className="text-[10px] text-gray-400">AI Confidence: {(Math.random() * 5 + 90).toFixed(1)}%</p>
                 </div>
                 <div className="text-right">
                     <p className="text-[9px] text-gray-500 uppercase">Hygiene Score</p>
                     <p className={`text-lg font-mono font-bold leading-none ${
                         zone.score > 80 ? 'text-emerald-400' : 
                         zone.score > 50 ? 'text-amber-400' : 'text-rose-400'
                     }`}>{zone.score}</p>
                 </div>
            </div>
        </div>
    )
}

export const CleanlinessTracker: React.FC = () => {
    // Mock Data for Multiple Zones
    const [zones, setZones] = useState<CleanlinessZoneData[]>([
        {
            id: 'z1', name: 'Main Corridor', image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=600&auto=format&fit=crop',
            status: 'CLEAN', score: 98, detections: []
        },
        {
            id: 'z2', name: 'Canteen Zone B', image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
            status: 'PENDING', score: 65, 
            detections: [
                { x: 30, y: 60, w: 15, h: 15, label: 'Wrapper', confidence: 92 },
                { x: 60, y: 70, w: 20, h: 12, label: 'Spill', confidence: 88 }
            ]
        },
        {
            id: 'z3', name: 'East Wing Bin', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop',
            status: 'CRITICAL', score: 35, 
            detections: [
                { x: 25, y: 30, w: 50, h: 60, label: 'OVERFLOW', confidence: 99 }
            ]
        },
        {
            id: 'z4', name: 'Library Entrance', image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop',
            status: 'SCANNING', score: 0, detections: []
        }
    ]);

    // Effect to simulate scanning rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setZones(prev => prev.map(z => {
                if (z.status === 'SCANNING') {
                    // Switch from scanning to Result
                    return { ...z, status: 'CLEAN', score: 96 }; 
                }
                if (Math.random() > 0.98 && z.status === 'CLEAN') {
                    return { ...z, status: 'SCANNING', score: 0 };
                }
                return z;
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card title="Hygiene AI Vision" icon={<Sparkles className="w-5 h-5" />} className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 overflow-y-auto">
                {zones.map((zone, i) => (
                    <TrashPreview key={i} zone={zone} />
                ))}
            </div>
            
            <div className="mt-2 border-t border-white/5 pt-2 flex justify-between items-center px-2">
                 <span className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                     <div className="w-2 h-2 bg-orbit-cyan rounded-full animate-pulse"></div>
                     Auto-Task Generation Active
                 </span>
                 <button className="text-[10px] font-bold text-orbit-cyan hover:text-white uppercase tracking-wider flex items-center gap-1">
                     <ScanLine className="w-3 h-3" /> Force Rescan All
                 </button>
            </div>
        </Card>
    );
}