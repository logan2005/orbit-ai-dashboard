import React, { useState, useEffect, useRef } from 'react';
import { Zap, Bell, ShieldCheck, ArrowLeft, Sun, Droplets, ScanFace, Sparkles, Terminal } from 'lucide-react';
import { SolarPanel } from './components/dashboard/SolarPanel';
import { EnergyGrid } from './components/dashboard/EnergyGrid';
import { SecurityMatrix, CleanlinessTracker } from './components/dashboard/VisionSystems';
import { AlertLog } from './components/dashboard/AlertLog';
import { SolarData, RoomStatus, AlertLog as AlertLogType, TransparencyEvent, BuildingStats, SecurityFeed } from './types';
import { Card } from './components/ui/Card';
import { SystemTransparency } from './components/dashboard/SystemTransparency';
import { SolarReport, EnergyReport, SecurityReport, CleanlinessReport } from './components/dashboard/ModuleReports';

// --- MOCK DATA ---
const generateMockData = () => {
    // Generate Solar Data with inverse Grid Usage logic
    const solarData: SolarData[] = Array.from({ length: 15 }).map((_, i) => {
        const actual = 40 + Math.random() * 20;
        // The higher the solar, the lower the grid usage (Load Shifting logic)
        const baseLoad = 80; 
        const gridUsage = Math.max(5, baseLoad - actual - (Math.random() * 10));
        
        return {
            time: `${10 + i}:00`,
            actual: actual,
            predicted: 45 + Math.random() * 10,
            gridUsage: gridUsage,
            batteryLevel: 60 + (i * 1.5) // Battery charging over time
        };
    });

    const rooms: RoomStatus[] = [
        { 
            id: '101', name: 'Lecture Hall A', isOccupied: true, powerConsumption: 2.4, status: 'OPTIMAL', source: 'SOLAR', 
            camFeed: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=600&auto=format&fit=crop',
            devices: [
                { name: 'AC Unit 1', power: 1.2, type: 'HVAC', status: 'ON' },
                { name: 'Projector', power: 0.5, type: 'MISC', status: 'ON' },
                { name: 'Lights', power: 0.7, type: 'LIGHT', status: 'ON' }
            ]
        },
        { 
            id: '102', name: 'Lab 3', isOccupied: false, powerConsumption: 0.1, status: 'OFF', source: 'GRID', 
            camFeed: 'https://images.unsplash.com/photo-1581093458791-9f302e686c57?q=80&w=600&auto=format&fit=crop',
            devices: [
                { name: 'Main Equip', power: 0.0, type: 'MISC', status: 'OFF' },
                { name: 'Safety Light', power: 0.1, type: 'LIGHT', status: 'ON' }
            ]
        },
        { 
            id: '103', name: 'Library Zone 1', isOccupied: false, powerConsumption: 1.8, status: 'WASTAGE', source: 'HYBRID', 
            camFeed: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop',
            devices: [
                { name: 'Central AC', power: 1.5, type: 'HVAC', status: 'ON' },
                { name: 'Reading Lights', power: 0.3, type: 'LIGHT', status: 'ON' }
            ]
        },
        { 
            id: '104', name: 'Staff Room', isOccupied: true, powerConsumption: 0.8, status: 'OPTIMAL', source: 'SOLAR', 
            camFeed: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop',
            devices: [
                { name: 'Coffee Machine', power: 0.4, type: 'MISC', status: 'ON' },
                { name: 'Lights', power: 0.4, type: 'LIGHT', status: 'ON' }
            ]
        },
        { 
            id: '105', name: 'Auditorium', isOccupied: false, powerConsumption: 0.0, status: 'OFF', source: 'GRID', 
             camFeed: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600&auto=format&fit=crop',
            devices: [
                 { name: 'Stage Lights', power: 0.0, type: 'LIGHT', status: 'OFF' },
                 { name: 'Sound Sys', power: 0.0, type: 'MISC', status: 'OFF' }
            ]
        },
        { 
            id: '106', name: 'Server Room', isOccupied: false, powerConsumption: 3.2, status: 'OPTIMAL', source: 'GRID', 
            camFeed: 'https://images.unsplash.com/photo-1558494949-efc5e60c9480?q=80&w=600&auto=format&fit=crop',
            devices: [
                { name: 'Cooling Array', power: 1.8, type: 'HVAC', status: 'ON' },
                { name: 'Racks 1-4', power: 1.4, type: 'MISC', status: 'ON' }
            ]
        },
    ];
    
    const buildings: BuildingStats[] = [
        { id: 'b1', name: 'Academic Block A', usage: 120, solarMix: 65, gridMix: 35 },
        { id: 'b2', name: 'Admin Block', usage: 45, solarMix: 30, gridMix: 70 },
        { id: 'b3', name: 'Laboratories', usage: 210, solarMix: 55, gridMix: 45 },
        { id: 'b4', name: 'Student Dorms', usage: 85, solarMix: 80, gridMix: 20 },
    ];

    return { solarData, rooms, buildings };
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'DASHBOARD' | 'SOLAR' | 'ENERGY' | 'SECURITY' | 'CLEANLINESS' | 'LOGS'>('DASHBOARD');
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState(generateMockData());
  
  const [securityFeeds, setSecurityFeeds] = useState<SecurityFeed[]>([
      { 
          id: '01', location: 'Classroom 3B', type: 'CLASSROOM', status: 'SAFE', 
          staffDetected: true, studentCount: 42, activity: 'STUDYING', flaggedIndividuals: 0, 
          camUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop'
      },
      { 
          id: '02', location: 'North Corridor', type: 'CORRIDOR', status: 'SAFE', 
          staffDetected: false, studentCount: 12, activity: 'LOITERING', flaggedIndividuals: 1,
          camUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&auto=format&fit=crop'
      },
      { 
          id: '03', location: 'Main Canteen', type: 'COMMON_AREA', status: 'WARNING', 
          staffDetected: false, studentCount: 85, activity: 'GATHERING', flaggedIndividuals: 0,
          camUrl: 'https://images.unsplash.com/photo-1544928147-79a2e746b5e9?q=80&w=400&auto=format&fit=crop'
      },
      { 
          id: '04', location: 'Lab Complex', type: 'CLASSROOM', status: 'SAFE', 
          staffDetected: true, studentCount: 20, activity: 'STUDYING', flaggedIndividuals: 0,
          camUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop'
      },
      { 
          id: '05', location: 'Main Gate', type: 'COMMON_AREA', status: 'SAFE', 
          staffDetected: true, studentCount: 5, activity: 'EMPTY', flaggedIndividuals: 0,
          camUrl: 'https://images.unsplash.com/photo-1623328328766-02e7b57970d2?q=80&w=400&auto=format&fit=crop'
      },
      { 
          id: '06', location: 'Exam Hall B', type: 'CLASSROOM', status: 'SAFE', 
          staffDetected: true, studentCount: 55, activity: 'STUDYING', flaggedIndividuals: 0,
          camUrl: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?q=80&w=400&auto=format&fit=crop'
      },
  ]);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const [logs, setLogs] = useState<AlertLogType[]>([
      { id: '1', timestamp: '10:42 AM', category: 'SOLAR', message: 'Load shifted to solar grid.', severity: 'low' },
      { id: '2', timestamp: '10:30 AM', category: 'ENERGY', message: 'Room 103: Empty with AC On. Auto-shutdown initiated.', severity: 'medium' },
      { id: '3', timestamp: '09:15 AM', category: 'CLEANLINESS', message: 'Task generated: Corridor B Spill.', severity: 'low' },
  ]);

  const [transparencyLogs, setTransparencyLogs] = useState<TransparencyEvent[]>([
      { id: '1', timestamp: '10:42:01', module: 'SOLAR', type: 'ANALYSIS', detail: 'Irradiance delta > 5%. Recalculating forecast.', confidence: 0.98 },
      { id: '2', timestamp: '10:42:05', module: 'SOLAR', type: 'ACTION', detail: 'Grid export throttle set to 20%.', confidence: 0.99 },
      { id: '3', timestamp: '10:42:15', module: 'ENERGY', type: 'DECISION', detail: 'Room 103 Occupancy = 0. Power = 1.8kW.', confidence: 0.95 },
  ]);

  // Click outside to close notifications
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationRef]);

  // Simulation Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      
      // Update Security Feeds Logic
      setSecurityFeeds(prev => {
          return prev.map(feed => {
              const newFeed = { ...feed };
              
              // Simulate Staff leaving class
              if (feed.type === 'CLASSROOM' && Math.random() > 0.95) {
                  newFeed.staffDetected = !newFeed.staffDetected;
                  newFeed.status = !newFeed.staffDetected ? 'WARNING' : 'SAFE';
              }
              
              // Simulate Corridor Crowd/Fight
              if (feed.type === 'CORRIDOR') {
                  if (Math.random() > 0.98) {
                      newFeed.activity = 'FIGHTING';
                      newFeed.status = 'CRITICAL';
                      // Auto-log conflict
                      setLogs(l => [{
                          id: Date.now().toString(),
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
                          category: 'SECURITY',
                          message: `Clash detected at ${feed.location}. Staff dispatched.`,
                          severity: 'high'
                      }, ...l]);
                  } else if (newFeed.activity === 'FIGHTING' && Math.random() > 0.8) {
                      newFeed.activity = 'LOITERING';
                      newFeed.status = 'SAFE';
                  }
              }

              // Simulate Canteen Crowd
              if (feed.type === 'COMMON_AREA') {
                  newFeed.studentCount = Math.floor(60 + Math.random() * 40);
                  if (newFeed.studentCount > 90) newFeed.status = 'WARNING';
                  else newFeed.status = 'SAFE';
              }

              return newFeed;
          });
      });

      setData(prev => {
          // Dynamic updates for solar/grid data
          const newSolar = prev.solarData.map(s => {
             const fluctuation = (Math.random() - 0.5) * 2; 
             return { ...s, actual: Math.max(0, s.actual + fluctuation) };
          });

          const newRooms = prev.rooms.map(r => ({
              ...r,
              powerConsumption: r.isOccupied ? 2 + Math.random() : 0.1,
          }));
          
          if(Math.random() > 0.8) {
              const wastageRoomIndex = prev.rooms.findIndex(r => r.id === '103');
              if (wastageRoomIndex !== -1) {
                  newRooms[wastageRoomIndex].status = 'WASTAGE';
                  newRooms[wastageRoomIndex].isOccupied = false;
                  newRooms[wastageRoomIndex].devices.forEach(d => d.status = 'ON');
              }
          } else if(Math.random() > 0.5) {
               const room103 = newRooms.find(r => r.id === '103');
               if (room103) room103.status = 'OFF';
          }
          
          return { ...prev, rooms: newRooms, solarData: newSolar };
      });
      
      // Simulate Transparency Logs
      if (Math.random() > 0.7) {
          const modules = ['SOLAR', 'ENERGY', 'SECURITY'];
          const actions = ['Scanning...', 'Optimizing...', 'Analyzing Pattern...', 'Syncing DB...'];
          const mod = modules[Math.floor(Math.random() * modules.length)];
          const newLog: TransparencyEvent = {
              id: Date.now().toString(),
              timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
              module: mod,
              type: Math.random() > 0.5 ? 'ANALYSIS' : 'DECISION',
              detail: actions[Math.floor(Math.random() * actions.length)],
              confidence: 0.85 + Math.random() * 0.14
          };
          setTransparencyLogs(prev => [newLog, ...prev].slice(0, 20));
      }

    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'SOLAR':
        return (
          <div className="flex flex-col gap-6 h-full">
            <div className="h-[45vh]">
               <SolarPanel data={data.solarData} />
            </div>
            <div className="flex-1 min-h-[300px]">
               <SolarReport data={data.solarData} buildings={data.buildings} />
            </div>
          </div>
        );
      case 'ENERGY':
        return (
          <div className="flex flex-col gap-6 h-full">
            <div className="h-[45vh]">
              <EnergyGrid rooms={data.rooms} totalSavings={12.4} />
            </div>
            <div className="flex-1 min-h-[300px]">
              <EnergyReport rooms={data.rooms} />
            </div>
          </div>
        );
      case 'SECURITY':
        return (
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 min-h-0">
               <SecurityMatrix feeds={securityFeeds} />
            </div>
            <div className="h-[250px]">
               <SecurityReport feeds={securityFeeds} />
            </div>
          </div>
        );
      case 'CLEANLINESS':
        return (
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 min-h-0">
               <CleanlinessTracker />
            </div>
             <div className="h-[250px]">
               <CleanlinessReport />
            </div>
          </div>
        );
      case 'LOGS':
        return (
          <div className="h-[80vh]">
             <AlertLog logs={logs} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-orbit-950 text-gray-200 selection:bg-orbit-cyan selection:text-black font-sans pb-10 flex flex-col">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Top Bar */}
      <nav className="relative z-20 glass-panel border-b border-white/5 px-6 py-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveView('DASHBOARD')}>
            <div className="bg-orbit-cyan/10 p-2 rounded-lg border border-orbit-cyan/30">
                <Zap className="w-6 h-6 text-orbit-cyan" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-white">ORBIT AI</h1>
                <p className="text-[10px] text-orbit-cyan uppercase tracking-widest font-mono">Infra Intelligence System</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs text-gray-400 uppercase">System Status</span>
                <span className="text-sm font-mono text-orbit-emerald flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> ONLINE
                </span>
            </div>
            <div className="font-mono text-2xl font-bold text-gray-200">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            {/* Notification System */}
            <div className="relative" ref={notificationRef}>
                <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`p-2 rounded-full relative transition-all ${isNotificationsOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                </button>
                
                {isNotificationsOpen && (
                    <div className="absolute right-0 top-full mt-4 w-80 glass-panel rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
                        <div className="p-3 border-b border-white/10 bg-black/20 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-gray-300 uppercase">Active Alerts</h3>
                            <span className="bg-rose-500/20 text-rose-400 text-[10px] px-1.5 py-0.5 rounded border border-rose-500/30">4 New</span>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {logs.map(log => (
                                <div key={log.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-[10px] font-bold uppercase ${
                                            log.category === 'SECURITY' ? 'text-rose-400' : 'text-orbit-cyan'
                                        }`}>{log.category}</span>
                                        <span className="text-[10px] text-gray-500 font-mono">{log.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-snug">{log.message}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 text-center border-t border-white/10 bg-black/20">
                            <button className="text-[10px] text-gray-400 hover:text-white uppercase tracking-wider">View All Logs</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 mt-8 flex-1 flex flex-col mb-10">
        
        {activeView === 'DASHBOARD' ? (
          /* --- DASHBOARD GRID --- */
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-white mb-2">Mission Control</h2>
              <p className="text-gray-400">Select a module to view real-time intelligence and AI analysis.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                onClick={() => setActiveView('SOLAR')}
                title="Energy Intelligence" 
                icon={<Sun className="w-6 h-6" />}
                className="hover:shadow-orbit-amber/20"
              >
                <div className="mt-4 flex flex-col gap-2 h-32 justify-end">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-mono font-bold text-white">42.5<span className="text-sm text-gray-500 ml-1">kW</span></span>
                    <span className="text-orbit-emerald text-sm font-bold bg-orbit-emerald/10 px-2 py-1 rounded border border-orbit-emerald/20">OPTIMAL</span>
                  </div>
                  <p className="text-sm text-gray-400">Prediction Model Active</p>
                </div>
              </Card>

              <Card 
                onClick={() => setActiveView('ENERGY')}
                title="Energy Matrix" 
                icon={<Zap className="w-6 h-6" />}
                className="hover:shadow-orbit-cyan/20"
              >
                <div className="mt-4 flex flex-col gap-2 h-32 justify-end">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-mono font-bold text-white">124<span className="text-sm text-gray-500 ml-1">kWh</span></span>
                    <span className="text-orbit-cyan text-sm font-bold bg-orbit-cyan/10 px-2 py-1 rounded border border-orbit-cyan/20">SAVED</span>
                  </div>
                  <p className="text-sm text-gray-400">2 Rooms Auto-Shutdown</p>
                </div>
              </Card>

              <Card
                onClick={() => setActiveView('SECURITY')}
                title="Manpower Management System" 
                icon={<ScanFace className="w-6 h-6" />}
                className="hover:shadow-rose-500/20"
              >
                 <div className="mt-4 flex flex-col gap-2 h-32 justify-end">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-mono font-bold text-white">LIVE</span>
                    <span className="text-rose-400 text-sm font-bold bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">ACTIVE</span>
                  </div>
                  <p className="text-sm text-gray-400">Monitoring 4 Zones</p>
                </div>
              </Card>

              <Card 
                onClick={() => setActiveView('CLEANLINESS')}
                title="Hygiene AI" 
                icon={<Sparkles className="w-6 h-6" />}
                className="hover:shadow-purple-500/20"
              >
                 <div className="mt-4 flex flex-col gap-2 h-32 justify-end">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-mono font-bold text-white">98<span className="text-sm text-gray-500 ml-1">%</span></span>
                    <span className="text-purple-400 text-sm font-bold bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">CLEAN</span>
                  </div>
                  <p className="text-sm text-gray-400">Next Scan: 20m</p>
                </div>
              </Card>

              <Card 
                onClick={() => setActiveView('LOGS')}
                title="System Logs" 
                icon={<Terminal className="w-6 h-6" />}
                className="hover:shadow-gray-500/20"
              >
                 <div className="mt-4 flex flex-col gap-2 h-32 justify-end">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-mono font-bold text-white">12</span>
                    <span className="text-gray-400 text-sm font-bold bg-gray-500/10 px-2 py-1 rounded border border-gray-500/20">EVENTS</span>
                  </div>
                  <p className="text-sm text-gray-400">Last: 2m ago</p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* --- DETAIL PAGE VIEW --- */
          <div className="flex flex-col lg:flex-row gap-8 h-full animate-in slide-in-from-right duration-300">
            {/* Left Column: Visuals & Reports */}
            <div className="flex-1 flex flex-col gap-4">
               <button 
                onClick={() => setActiveView('DASHBOARD')}
                className="self-start flex items-center gap-2 text-sm text-orbit-cyan hover:text-white transition-colors mb-2 uppercase tracking-wider font-bold"
               >
                 <ArrowLeft className="w-4 h-4" /> Return to Dashboard
               </button>
               
               {renderContent()}
            </div>

            {/* Right Column: Transparency Panel */}
            <div className="lg:w-1/3 flex flex-col gap-6 mt-10">
                <SystemTransparency module={activeView} events={transparencyLogs} />
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;