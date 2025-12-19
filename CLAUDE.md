# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ORBIT AI - Infra Intelligence System is a real-time dashboard application for managing smart Infra infrastructure. Built with React 19, TypeScript, and Recharts, it provides a multi-module monitoring interface for solar energy, room energy optimization, manpower management, and hygiene AI systems.

## Development Commands

- `npm run dev` - Start development server on port 3000 (accessible at `http://localhost:3000`)
- `npm run build` - Build for production using Vite
- `npm run preview` - Preview production build locally

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` file. The Vite config exposes it as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

## Architecture

### Application Structure

The app is a **single-page dashboard with module-based navigation**:
- **Root component** (`App.tsx`): Main orchestrator managing view state, mock data generation, real-time simulations, and routing between dashboard modules
- **Entry point** (`index.tsx`): Standard React 19 root mounting with StrictMode
- **Dashboard modules**: Five core intelligence modules (Solar, Energy, Security, Cleanliness, Logs) accessible from main dashboard
- **Component library**: Reusable UI components in `/components/ui/` and domain-specific components in `/components/dashboard/`

### View System

The application uses a view-based navigation system controlled by the `activeView` state in `App.tsx`:

**Available Views:**
- `DASHBOARD` - Main landing grid with module cards
- `SOLAR` - Energy Intelligence panel with generation forecasts
- `ENERGY` - Energy Matrix showing room-level power optimization
- `SECURITY` - Manpower Management System with live camera feeds
- `CLEANLINESS` - Hygiene AI with cleanliness tracking
- `LOGS` - System event logs

**View Switching:**
- Main dashboard displays clickable module cards
- Each card sets `activeView` state via `setActiveView()`
- Detail views render module-specific components with a "Return to Dashboard" button
- Detail views include a right-side Transparency Panel showing AI decision logs

### Data Management

**Mock Data Generation** (`App.tsx:13-90`):
- `generateMockData()` creates solar data, room statuses, and building stats
- Solar data has inverse relationship with grid usage (load shifting logic)
- Room statuses include device-level breakdowns and camera feed URLs
- Building stats aggregate Infra-wide energy metrics

**Real-time Simulation** (`App.tsx:157-247`):
- `useEffect` with 2s interval simulates live data updates
- Security feed logic: simulates staff leaving, corridor fights, canteen crowds
- Energy logic: detects wastage (empty rooms with AC on), auto-generates alerts
- Transparency logs: randomly generated AI decision events for each module
- Alert logs: system events stored in state, displayed in notification dropdown

**State Structure:**
- `data` - Contains `solarData`, `rooms`, `buildings` from mock generator
- `securityFeeds` - Array of `SecurityFeed` objects with camera URLs and activity detection
- `logs` - Alert log entries with timestamp, category, message, severity
- `transparencyLogs` - AI transparency events showing decision-making process
- `time` - Current time updated every 2s for live clock display

### Component Patterns

**Dashboard Components:**
- `SolarPanel` - Recharts ComposedChart with Area/Line graphs for solar generation vs grid usage
- `EnergyGrid` - Room-level energy monitoring with device breakdowns
- `SecurityMatrix` - Grid of camera feeds with AI-detected activity status
- `CleanlinessTracker` - Hygiene monitoring dashboard
- `AlertLog` - Scrollable log viewer with category filtering
- `SystemTransparency` - Real-time AI decision stream (right sidebar in detail views)
- `ModuleReports` - Analytics reports for Solar, Energy, Security, Cleanliness modules

**UI Components:**
- `Card` - Glass-morphism card container with optional title, icon, onClick handler
- `Badge` - Status badge with variants: success, warning, danger, neutral

**Common Patterns:**
- All components use functional component syntax with TypeScript: `const Component: React.FC<Props> = () => {}`
- Props interfaces defined inline or imported from `types.ts`
- Glass-morphism styling via `.glass-panel` utility class
- Recharts for all data visualizations with dark theme customization
- Lucide React for all icons

### Styling System

**Tailwind Configuration** (in `index.html`):
- CDN-based Tailwind (no PostCSS)
- Custom color palette: `orbit-950` (background), `orbit-cyan`, `orbit-amber`, `orbit-emerald`
- Custom fonts: Inter (sans), JetBrains Mono (mono)
- Glass-panel effect: `rgba(15, 23, 42, 0.6)` with backdrop blur

**Custom CSS** (`index.html:45-71`):
- `.glass-panel` - Glassmorphism effect for cards/panels
- Custom scrollbar styling (dark theme)
- Background ambient glow overlays

**Design Tokens:**
- Background: `bg-orbit-950` (#020617)
- Accent: `text-orbit-cyan` (#06b6d4)
- Status colors: emerald (success), amber (warning), rose (danger)
- Borders: `border-white/5` for subtle dividers
- Typography: Inter for UI, JetBrains Mono for data/numbers

### Type System

All type definitions are centralized in `types.ts`:
- `SolarData` - Solar generation metrics with time series
- `RoomStatus` - Room occupancy, power, status, device array
- `RoomDevice` - Individual device with type (HVAC/LIGHT/MISC)
- `SecurityFeed` - Camera feed with AI detection results
- `BuildingStats` - Building-level energy aggregation
- `AlertLog` - System event log entry
- `TransparencyEvent` - AI decision transparency log

### Build Configuration

**Vite Setup** (`vite.config.ts`):
- React plugin with Fast Refresh
- Path alias: `@/*` resolves to project root
- Server on port 3000, host `0.0.0.0`
- Environment variables injected via `define` block
- GEMINI_API_KEY exposed as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

**TypeScript Config:**
- Target ES2022
- JSX transform: `react-jsx`
- `experimentalDecorators: true` for potential future use
- Path alias `@/*` configured to match Vite
- `noEmit: true` (Vite handles transpilation)

**Import Maps** (`index.html:72-82`):
- React, Recharts, Lucide loaded via esm.sh CDN
- Enables AI Studio compatibility
- No npm imports in runtime code

## Code Style

### Import Order
1. React core
2. External libraries (recharts, lucide-react)
3. Local components from `./components/`
4. Type imports from `./types`

```typescript
import React from 'react';
import { ComposedChart, Line } from 'recharts';
import { Sun, Zap } from 'lucide-react';
import { Card, Badge } from '../ui/Card';
import { SolarData } from '../../types';
```

### Component Definitions
- Use functional components with TypeScript: `const Component: React.FC<Props> = () => {}`
- Export named components: `export const SolarPanel = () => {}`
- Define props interfaces inline or at file top
- No default exports except `App.tsx`

### State Management
- Use React hooks (`useState`, `useEffect`, `useRef`)
- No external state libraries (Redux, Zustand, etc.)
- State colocation: module-specific state in `App.tsx`, component-local state in respective files

### Styling Conventions
- **Tailwind only** - no separate CSS files
- Responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Glass-panel for all major containers
- Consistent padding: `p-4` or `p-6` for cards, `px-6 py-4` for headers
- Status colors: emerald (optimal), amber (warning), rose (critical)

## File Organization

```
/
├── App.tsx                       # Main app with view routing & simulation
├── index.tsx                     # React root mount
├── index.html                    # HTML shell with Tailwind config & import maps
├── types.ts                      # Centralized TypeScript interfaces
├── vite.config.ts                # Vite build configuration
├── tsconfig.json                 # TypeScript compiler options
├── .env.local                    # API keys (not committed)
└── components/
    ├── ui/
    │   └── Card.tsx              # Reusable Card & Badge components
    └── dashboard/
        ├── SolarPanel.tsx        # Solar generation chart
        ├── EnergyGrid.tsx        # Room energy matrix
        ├── VisionSystems.tsx     # Security & cleanliness monitors
        ├── AlertLog.tsx          # System event logs
        ├── SystemTransparency.tsx # AI decision transparency panel
        └── ModuleReports.tsx     # Module analytics reports
```

## Key Technical Details

- **React 19** with Strict Mode
- **Vite 6** as build tool
- **TypeScript 5.8** with strict options
- **Recharts 3.6** for all charts/graphs
- **Lucide React** for icons
- **Tailwind CSS** via CDN (not PostCSS build)
- No routing library (view state-based navigation)
- No state management library (React hooks only)
- Import maps for CDN-based dependencies (AI Studio compatibility)
