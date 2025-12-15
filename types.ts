export interface SolarData {
  time: string;
  actual: number;
  predicted: number;
  gridUsage: number; // kW drawn from grid
  batteryLevel: number; // % charge
}

export interface BuildingStats {
  id: string;
  name: string;
  usage: number; // kW
  solarMix: number; // %
  gridMix: number; // %
}

export interface RoomDevice {
  name: string;
  power: number; // kW
  type: 'HVAC' | 'LIGHT' | 'MISC';
  status: 'ON' | 'OFF';
}

export interface RoomStatus {
  id: string;
  name: string;
  isOccupied: boolean;
  powerConsumption: number; // in kW
  status: 'OPTIMAL' | 'WASTAGE' | 'OFF';
  source: 'SOLAR' | 'GRID' | 'HYBRID';
  devices: RoomDevice[];
  camFeed?: string; // URL for mock feed
}

export interface WaterTankData {
  id: string;
  buildingName: string;
  level: number; // percentage 0-100
  capacity: number; // Liters
  inflow: number; // L/min (Pump rate)
  outflow: number; // L/min (Usage)
  pumpStatus: 'ON' | 'OFF' | 'MAINTENANCE';
  isLeaking: boolean;
  quality: {
    ph: number;
    turbidity: number; // NTU
  };
}

export interface WaterSystem {
  tanks: WaterTankData[];
  totalFlowRate: number;
  systemPressure: number; // psi
}

export interface SecurityFeed {
  id: string;
  location: string;
  type: 'CLASSROOM' | 'CORRIDOR' | 'COMMON_AREA';
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  staffDetected: boolean;
  studentCount: number;
  activity: 'STUDYING' | 'GATHERING' | 'FIGHTING' | 'LOITERING' | 'EMPTY';
  flaggedIndividuals: number; // Count of "notorious" students identified
  camUrl: string;
}

export interface AlertLog {
  id: string;
  timestamp: string;
  category: 'SOLAR' | 'ENERGY' | 'WATER' | 'SECURITY' | 'CLEANLINESS';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface CampusStats {
  gridDependency: number; // percentage
  energySaved: number; // kWh
  activeAlerts: number;
}

export interface TransparencyEvent {
  id: string;
  timestamp: string;
  module: string;
  type: 'DECISION' | 'ANALYSIS' | 'ACTION';
  detail: string;
  confidence: number;
}