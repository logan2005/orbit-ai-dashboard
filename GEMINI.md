# Project: Orbit AI - Smart Infra Dashboard

## Project Overview

This project is a React-based frontend application for **Orbit AI**, a "Smart Infra" intelligence system. It provides a dashboard for visualizing and managing various aspects of an Infra, including:

*   **Energy Intelligence:** Monitoring solar power generation and grid usage.
*   **Energy Matrix:** Tracking energy consumption in different rooms and identifying wastage.
*   **Water Resources:** Monitoring water tank levels, flow rates, and potential leaks.
*   **Manpower Management System:** Real-time security monitoring of different zones.
*   **Hygiene AI:** Tracking cleanliness status.
*   **System Logs:** A log of all automated system events and alerts.

The application is built with **React**, **TypeScript**, and **Vite**. It uses **Recharts** for data visualization and **Lucide React** for icons. The UI is designed with a modern, dark theme and appears to be using a custom design system. The application currently uses mock data generated within the `App.tsx` component.

## Building and Running

### Prerequisites

*   Node.js

### Running the application

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following line:
    ```
    GEMINI_API_KEY=your_api_key
    ```
    Replace `your_api_key` with your actual Gemini API key.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

### Building for production

To create a production build, run:

```bash
npm run build
```

This will create a `dist` directory with the optimized and minified assets.

## Development Conventions

*   **Styling:** The project seems to use a utility-first CSS approach, likely Tailwind CSS, given the class names in `App.tsx`.
*   **Components:** The application is structured with reusable components located in the `src/components` directory.
*   **State Management:** The main application state is managed within the `App.tsx` component using React's `useState` and `useEffect` hooks.
*   **Data Fetching:** Currently, the application uses mock data. In a real-world scenario, data fetching logic would likely be added to interact with a backend API.
*   **Typing:** The project uses TypeScript for static typing. Type definitions are located in `src/types.ts`.
