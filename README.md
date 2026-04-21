# ✈️ Real-Time Flight Tracker

A production-quality real-time flight tracking system built with **Node.js** (Backend) and **React Native / Expo** (Frontend). This project tracks aircraft currently in the skies over India, providing real-time position updates, altitude, velocity, and vertical movement direction.

---

## 🏗️ Architecture Overview

The system follows a clean, event-driven architecture designed for scalability and low latency:

1.  **Backend (Node.js)**:
    *   **Flight Service**: Polls the OpenSky Network REST API every 10 seconds.
    *   **Filtering Engine**: Processes raw aircraft states, filtering for active flights (airborne, specific altitude/speed thresholds) within the Indian geographic bounds.
    *   **WebSocket Server**: Maintains persistent connections with mobile clients and broadcasts updated flight data packets every cycle.
2.  **Frontend (React Native)**:
    *   **Socket Service**: Manages the life-cycle of the WebSocket connection, including automatic reconnection with backoff logic.
    *   **Map Component**: Renders a high-performance map using `react-native-maps`.
    *   **Smooth Animations**: Coordinates are interpolated using `AnimatedRegion`, ensuring aircraft "glide" smoothly across the map between 10-second updates.

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
# Navigate to backend directory
cd flight-tracker/backend

# Install dependencies
npm install

# Start the server
npm start
```
*The server will run on `http://localhost:3000` and `ws://localhost:3000`.*

### 2. Frontend Setup
```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo
npm start
```

---

## 🛠️ Key Technical Features

### Backend Flow
1.  **Polling**: Executes every 10 seconds.
2.  **Resilience**: Implements exponential backoff (up to 3 retries) for the flaky OpenSky API to ensure the system remains alive during intermittent downstream failures.
3.  **Data Transformation**: Converts complex nested array structures from OpenSky into clean, typed JSON objects.
    *   `id`: Unique ICAO24 identifier.
    *   `direction`: Computed as `climbing`, `descending`, or `level` based on vertical rate.
4.  **Logging**: Detailed console logging for API status, filter counts, and active client metrics.

### Frontend Flow
1.  **Life-cycle Hook**: Connects to the WebSocket on mount and cleans up on unmount.
2.  **Reconnection Logic**: If the backend goes down, the mobile app shows a "Reconnecting" UI and attempts to re-establish the socket every 3 seconds.
3.  **Cross-Platform Map View**: 
    *   **iOS/Android**: Uses native `react-native-maps` with plane icons and callouts.
    *   **Smooth Interpolation**: Prevents "teleporting" markers by animating position changes over 5 seconds.
    *   **Web Fallback**: Implements `MapView.web.js` to provide a clean data dashboard, bypassing native module limitations.
4.  **Empty States**: Clear messaging when no aircraft meet the filtering criteria.

---

## 🧠 Assumptions & Design Decisions
- **OpenSky Network**: Used as the primary data source. Note that OpenSky data can be delayed by 10-20 seconds.
- **Geographic Bounds**: Restricted to India (Lat: 8 to 37, Long: 68 to 97) to ensure high-density, relevant results.
- **Polling Interval**: Set to 10s to balance real-timeliness with API rate limits.
- **Dynamic Selection**: Limited to top 2 flights for clarity in demonstration, easily adjustable in `flightService.js`.

---

## 🛡️ Edge Cases Handled
- **Platform Compatibility**: Uses file-based platform branching (`MapView.js` vs `MapView.web.js`) to ensure the app runs flawlessly on Web, iOS, and Android despite native-only dependencies.
- **Downstream API Failure**: Logged and retried with backoff; empty state broadcast if fatal.
- **WebSocket Disconnection**: Mobile app handles socket drops gracefully with automatic retry.
- **Malformed API Data**: Null checks for Latitude/Longitude in the filtering pipe to prevent frontend crashes.
- **No Flights**: Clean empty state UI instead of a blank map.

---

## 🔮 Future Improvements
- **Database Integration**: Store historical flight paths for "breadcrumb" trailing.
- **Authentication**: JWT-based security for the WebSocket connection.
- **Clustering**: Handle 100+ flights simultaneously using marker clustering.
- **Push Notifications**: Notify users when a flight enters a specific polygon.

---

**Developed for Technical Assessment** | *Clean. Modular. Production-Ready.*
