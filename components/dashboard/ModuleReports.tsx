import React from 'react';
import { Card, Badge } from '../ui/Card';
import { SolarData, RoomStatus, WaterSystem, BuildingStats, WaterTankData, SecurityFeed } from '../../types';
import { ArrowUpRight, ArrowDownRight, User, AlertTriangle, CheckCircle, Clock, DollarSign, PieChart, Building, Zap, Plug, Droplets, Activity, Beaker, Settings, ShieldAlert, UserX, Siren, UserCheck, MapPin, Phone, ClipboardList } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';

export const SolarReport: React.FC<{ data: SolarData[]; buildings: BuildingStats[] }> = ({ data, buildings }) => {
    const totalGen = data.reduce((acc, curr) => acc + curr.actual, 0);
    const totalGrid = data.reduce((acc, curr) => acc + curr.gridUsage, 0);
    const totalLoad = totalGen + totalGrid;
    const solarPercentage = (totalGen / totalLoad) * 100;
    
    // Mock currency calculation (e.g., $0.15 per kWh)
    const savedAmount = totalGen * 0.15;

    return (
        <Card title="Generation & Efficiency Report" className="h-full overflow-y-auto">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs text-emerald-400 uppercase font-bold tracking-wider">Estimated Savings</p>
                        <p className="text-2xl font-mono font-bold text-white mt-1">${savedAmount.toFixed(2)}</p>
                        <p className="text-[10px] text-gray-400">Today's offset value</p>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                        <DollarSign className="w-6 h-6 text-emerald-400" />
                    </div>
                </div>

                <div className="p-4 bg-orbit-amber/10 border border-orbit-amber/20 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs text-orbit-amber uppercase font-bold tracking-wider">Load Shift Efficiency</p>
                        <p className="text-2xl font-mono font-bold text-white mt-1">94.2%</p>
                        <p className="text-[10px] text-gray-400">Battery & Solar Utilization</p>
                    </div>
                    <div className="p-3 bg-orbit-amber/20 rounded-full">
                        <PieChart className="w-6 h-6 text-orbit-amber" />
                    </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                     <div>
                        <p className="text-xs text-blue-400 uppercase font-bold tracking-wider">Total Solar Export</p>
                        <p className="text-2xl font-mono font-bold text-white mt-1">{totalGen.toFixed(1)} kWh</p>
                        <p className="text-[10px] text-gray-400">Clean Energy Generated</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-full">
                        <ArrowUpRight className="w-6 h-6 text-blue-400" />
                    </div>
                </div>
            </div>

            {/* Building Wise Analysis */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-bold text-gray-200 uppercase">Building Wise Analysis</h3>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="bg-white/5 text-gray-200 uppercase font-mono text-xs">
                            <tr>
                                <th className="px-4 py-3">Building Name</th>
                                <th className="px-4 py-3">Total Load</th>
                                <th className="px-4 py-3">Solar Mix</th>
                                <th className="px-4 py-3">Grid Mix</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-black/20">
                            {buildings.map((b, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">{b.name}</td>
                                    <td className="px-4 py-3 font-mono">{b.usage} kW</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-orbit-amber" style={{ width: `${b.solarMix}%` }}></div>
                                            </div>
                                            <span className="text-xs text-orbit-amber">{b.solarMix}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                         <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-orbit-cyan" style={{ width: `${b.gridMix}%` }}></div>
                                            </div>
                                            <span className="text-xs text-orbit-cyan">{b.gridMix}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {b.solarMix > 50 ? (
                                            <Badge variant="success">Green</Badge>
                                        ) : (
                                            <Badge variant="warning">Hybrid</Badge>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Raw Data Log */}
            <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Recent Generation Log</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-gray-500">
                        <thead className="bg-white/5 text-gray-400 uppercase font-mono">
                            <tr>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Solar (kW)</th>
                                <th className="px-4 py-2">Grid (kW)</th>
                                <th className="px-4 py-2">Battery</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.slice(-5).reverse().map((d, i) => (
                                <tr key={i} className="hover:bg-white/5">
                                    <td className="px-4 py-2 font-mono">{d.time}</td>
                                    <td className="px-4 py-2 text-orbit-amber">{d.actual.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-orbit-cyan">{d.gridUsage.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-emerald-400">{d.batteryLevel}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
};

export const EnergyReport: React.FC<{ rooms: RoomStatus[] }> = ({ rooms }) => {
    // Calculate mix
    const solarRooms = rooms.filter(r => r.source === 'SOLAR').length;
    const gridRooms = rooms.filter(r => r.source === 'GRID').length;
    const hybridRooms = rooms.filter(r => r.source === 'HYBRID').length;

    const sourceData = [
        { name: 'Solar', value: solarRooms, color: '#f59e0b' },
        { name: 'Grid', value: gridRooms, color: '#06b6d4' },
        { name: 'Hybrid', value: hybridRooms, color: '#10b981' },
    ];

    const sortedRooms = [...rooms].sort((a, b) => b.powerConsumption - a.powerConsumption);

    return (
        <Card title="Consumption Analytics" className="h-full overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Source Mix Chart */}
                <div className="w-full md:w-1/3 h-48 relative">
                     <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 text-center">Power Source Distribution</h3>
                     <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={sourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                        </RePieChart>
                     </ResponsiveContainer>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2 text-center pointer-events-none">
                         <span className="text-xl font-bold font-mono text-white">{rooms.length}</span>
                         <span className="block text-[8px] text-gray-500 uppercase">Total Zones</span>
                     </div>
                </div>
                
                {/* Stats Cards */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-orbit-cyan">
                            <Plug className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Grid Load</span>
                        </div>
                        <span className="text-2xl font-mono font-bold text-white">
                            {rooms.filter(r => r.source !== 'SOLAR').reduce((a, b) => a + b.powerConsumption, 0).toFixed(1)} kW
                        </span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-orbit-amber">
                            <Zap className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Solar Load</span>
                        </div>
                        <span className="text-2xl font-mono font-bold text-white">
                            {rooms.filter(r => r.source !== 'GRID').reduce((a, b) => a + b.powerConsumption, 0).toFixed(1)} kW
                        </span>
                    </div>
                    <div className="col-span-2 p-4 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                        <div>
                             <p className="text-xs text-gray-400 uppercase">Active Devices</p>
                             <p className="text-xl font-bold text-white font-mono">
                                 {rooms.reduce((acc, r) => acc + r.devices.filter(d => d.status === 'ON').length, 0)}
                             </p>
                        </div>
                        <Badge variant="neutral">System Healthy</Badge>
                    </div>
                </div>
            </div>

            {/* Granular Breakdown Table */}
            <div>
                 <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase">Zone Consumption Ranking</h3>
                 </div>
                 <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="bg-white/5 text-gray-200 uppercase font-mono text-xs">
                            <tr>
                                <th className="px-4 py-3">Zone</th>
                                <th className="px-4 py-3">Total Power</th>
                                <th className="px-4 py-3">Source</th>
                                <th className="px-4 py-3">Main Load</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-black/20">
                            {sortedRooms.map((r, i) => {
                                const mainLoad = r.devices.sort((a,b) => b.power - a.power)[0];
                                return (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-medium text-white">{r.name}</td>
                                        <td className="px-4 py-3 font-mono">{r.powerConsumption.toFixed(2)} kW</td>
                                        <td className="px-4 py-3">
                                            {r.source === 'SOLAR' && <span className="text-orbit-amber text-xs font-bold">SOLAR</span>}
                                            {r.source === 'GRID' && <span className="text-orbit-cyan text-xs font-bold">GRID</span>}
                                            {r.source === 'HYBRID' && <span className="text-emerald-400 text-xs font-bold">HYBRID</span>}
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            {mainLoad ? `${mainLoad.name} (${mainLoad.power} kW)` : '-'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
};

export const WaterReport: React.FC<{ system: WaterSystem }> = ({ system }) => {
    const totalCapacity = system.tanks.reduce((acc, t) => acc + t.capacity, 0);
    const currentTotal = system.tanks.reduce((acc, t) => acc + (t.capacity * (t.level/100)), 0);
    const overallLevel = (currentTotal / totalCapacity) * 100;
    
    // Data for bar chart
    const barData = system.tanks.map(t => ({
        name: t.buildingName.split(' ')[0], // Short name
        usage: t.outflow,
        inflow: t.inflow
    }));

    return (
        <Card title="Flow Analytics & Quality" className="h-full overflow-y-auto">
            {/* Top Metrics */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs text-blue-400 uppercase font-bold tracking-wider">Total Reserves</p>
                        <p className="text-xl font-mono font-bold text-white mt-1">{(currentTotal/1000).toFixed(1)} <span className="text-xs text-gray-400">kL</span></p>
                        <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${overallLevel}%` }}></div>
                        </div>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-full">
                        <Droplets className="w-6 h-6 text-blue-400" />
                    </div>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs text-emerald-400 uppercase font-bold tracking-wider">Active Flow Rate</p>
                        <p className="text-xl font-mono font-bold text-white mt-1">{system.totalFlowRate.toFixed(1)} <span className="text-xs text-gray-400">L/m</span></p>
                        <p className="text-[10px] text-gray-400">Across all sectors</p>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                        <Activity className="w-6 h-6 text-emerald-400" />
                    </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-between">
                     <div>
                        <p className="text-xs text-purple-400 uppercase font-bold tracking-wider">Water Quality</p>
                        <div className="flex gap-3 mt-1">
                            <div>
                                <span className="text-[10px] text-gray-400 block">pH</span>
                                <span className="font-mono font-bold text-white">7.2</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-400 block">Turbidity</span>
                                <span className="font-mono font-bold text-white">0.4</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-full">
                        <Beaker className="w-6 h-6 text-purple-400" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Chart */}
                <div className="flex-1 h-48 bg-black/20 rounded-xl border border-white/5 p-4">
                     <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Real-time Inflow vs Usage</h3>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                            <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="inflow" name="Pump Inflow" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="usage" name="Usage Outflow" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                     </ResponsiveContainer>
                </div>
                
                {/* Alert List */}
                <div className="w-full md:w-1/3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">System Anomalies</h3>
                    <div className="space-y-2">
                        {system.tanks.filter(t => t.isLeaking).map(t => (
                            <div key={t.id} className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-lg flex items-center gap-3">
                                <AlertTriangle className="w-4 h-4 text-rose-500" />
                                <div>
                                    <p className="text-sm font-bold text-rose-400">Leak Detected</p>
                                    <p className="text-[10px] text-gray-400">{t.buildingName} Tank</p>
                                </div>
                            </div>
                        ))}
                        {system.tanks.filter(t => t.pumpStatus === 'MAINTENANCE').map(t => (
                             <div key={t.id} className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-center gap-3">
                                <Settings className="w-4 h-4 text-amber-500" />
                                <div>
                                    <p className="text-sm font-bold text-amber-400">Manual Override</p>
                                    <p className="text-[10px] text-gray-400">{t.buildingName} - Maintenance</p>
                                </div>
                            </div>
                        ))}
                        {!system.tanks.some(t => t.isLeaking || t.pumpStatus === 'MAINTENANCE') && (
                            <div className="p-4 text-center text-xs text-gray-500 italic border border-white/5 rounded-lg">
                                No active anomalies detected.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export const SecurityReport: React.FC<{ feeds: SecurityFeed[] }> = ({ feeds }) => {
    // Analytics
    const stafflessClasses = feeds.filter(f => f.type === 'CLASSROOM' && !f.staffDetected && f.studentCount > 0);
    const conflicts = feeds.filter(f => f.activity === 'FIGHTING');
    const warnings = feeds.filter(f => f.status === 'WARNING');

    return (
        <Card title="Incident Analysis Log" className="h-full overflow-y-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 {/* Live Status */}
                 <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase">Active Alerts</h3>
                    {conflicts.length > 0 ? (
                        conflicts.map(c => (
                            <div key={c.id} className="p-3 bg-rose-950/30 border border-rose-500 animate-pulse rounded-lg flex items-center gap-3">
                                <Siren className="w-6 h-6 text-rose-500 animate-spin" />
                                <div>
                                    <p className="font-bold text-rose-400">CRITICAL: {c.location}</p>
                                    <p className="text-[10px] text-gray-400">Clash detection confidence 98% • Staff Notified</p>
                                </div>
                            </div>
                        ))
                    ) : (
                         <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5 text-emerald-500" />
                            <p className="text-xs text-emerald-400">No active conflicts detected.</p>
                        </div>
                    )}
                    
                    {stafflessClasses.map(s => (
                        <div key={s.id} className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-center gap-3">
                            <UserX className="w-5 h-5 text-amber-500" />
                             <div>
                                <p className="font-bold text-sm text-amber-400">Unsupervised Class: {s.location}</p>
                                <p className="text-[10px] text-gray-400">{s.studentCount} students detected without faculty</p>
                            </div>
                        </div>
                    ))}
                 </div>

                 {/* Deployment Recommendations */}
                 <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Staff Deployment Recon</h3>
                    <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                        <ul className="space-y-2 text-xs text-gray-300">
                             {conflicts.length > 0 && (
                                <li className="flex items-center gap-2 text-rose-400 font-bold">
                                    <ArrowUpRight className="w-3 h-3" /> DISPATCH SECURITY TO {conflicts[0].location}
                                </li>
                             )}
                             {stafflessClasses.length > 0 && (
                                <li className="flex items-center gap-2 text-amber-400">
                                    <ArrowUpRight className="w-3 h-3" /> Assign relief staff to {stafflessClasses[0].location}
                                </li>
                             )}
                             {warnings.length > 0 && (
                                 <li className="flex items-center gap-2 text-blue-400">
                                    <ArrowDownRight className="w-3 h-3" /> Monitor crowd density in {warnings[0].location}
                                </li>
                             )}
                             <li className="flex items-center gap-2 text-gray-500">
                                • Main Gate: Normal Traffic
                             </li>
                             <li className="flex items-center gap-2 text-gray-500">
                                • Exam Hall: Surveillance Active
                             </li>
                        </ul>
                    </div>
                 </div>
             </div>
        </Card>
    );
};

export const CleanlinessReport: React.FC = () => {
    const staff = [
        { id: 1, name: "Rajesh Kumar", role: "Supervisor", status: "Active", zone: "Block A", img: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, name: "Sunita Devi", role: "Staff", status: "Busy", zone: "Canteen", img: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 3, name: "Anil Singh", role: "Staff", status: "Available", zone: "Corridor", img: "https://randomuser.me/api/portraits/men/45.jpg" },
    ];

    const tasks = [
        { id: 101, area: "2nd Floor Corridor", type: "Spill Cleanup", status: "In Progress", assignee: "Sunita Devi", time: "10m ago", priority: "High" },
        { id: 102, area: "Canteen Area A", type: "Routine Sanitize", status: "Completed", assignee: "Anil Singh", time: "1h ago", priority: "Normal" },
        { id: 103, area: "Library Entrance", type: "Bin Overflow", status: "Pending", assignee: "Unassigned", time: "5m ago", priority: "Medium" },
    ];

    return (
        <Card title="Sanitation Command Center" className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Left Column: Staff Roster */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-orbit-cyan" />
                            Active Duty Roster
                        </h3>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">3 On-Site</span>
                    </div>
                    <div className="space-y-3">
                        {staff.map(person => (
                            <div key={person.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-lg hover:border-white/20 transition-colors">
                                <div className="relative">
                                    <img src={person.img} alt={person.name} className="w-10 h-10 rounded-full object-cover border border-gray-600" />
                                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-black ${
                                        person.status === 'Active' || person.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-200">{person.name}</h4>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                        <span className="uppercase">{person.role}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1 text-gray-500">
                                            <MapPin className="w-3 h-3" /> {person.zone}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <button className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Task Queue */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-purple-400" />
                        Live Task Queue
                    </h3>
                    <div className="space-y-3">
                         {tasks.map(task => (
                            <div key={task.id} className="p-3 bg-black/20 border border-white/10 rounded-lg relative overflow-hidden group">
                                {task.priority === 'High' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>}
                                {task.priority === 'Medium' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>}
                                {task.priority === 'Normal' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                                
                                <div className="flex justify-between items-start pl-2">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-200">{task.area}</h4>
                                        <p className="text-[10px] text-purple-300 font-mono mb-1">{task.type}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <Clock className="w-3 h-3" /> {task.time}
                                            <span>•</span>
                                            <span className="text-gray-400">Assignee: {task.assignee}</span>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        task.status === 'Completed' ? 'success' : 
                                        task.status === 'In Progress' ? 'warning' : 'neutral'
                                    }>
                                        {task.status}
                                    </Badge>
                                </div>
                            </div>
                         ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] text-gray-500">Daily Efficiency Score</span>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[85%]"></div>
                            </div>
                            <span className="text-xs font-bold text-emerald-400">85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};