import axios from "axios";
import logger from "../utils/logger.js";
import { withRetry } from "../utils/retry.js";
import { selectConsistentFlights } from "./flightSelector.js";
import { broadcastFlights } from "../websocket/socketManager.js";

const API_URL = "https://opensky-network.org/api/states/all?lamin=8.0&lomin=68.0&lamax=37.0&lomax=97.0";

export const startFlightPolling = () => {
    logger.info("Initializing flight polling service...");
    fetchAndBroadcast(); // Initial run
    setInterval(fetchAndBroadcast, 15000); // Polling every 15s (recommended for public tier)
};

/**
 * Main orchestration logic for fetching, filtering, and broadcasting flights.
 */
const fetchAndBroadcast = async () => {
    try {
        logger.info("Starting new fetch cycle from OpenSky...");
        const response = await withRetry(() => axios.get(API_URL, { timeout: 10000 }));
        
        const rawStates = response.data.states || [];
        const airborneFlights = rawStates.filter(validateAndFilter);
        
        let transformedData = [];
        
        if (airborneFlights.length === 0) {
            logger.warn("Radar empty. Injecting realistic mock data for demo stability.");
            transformedData = generateMockFlights();
        } else {
            const selectedRaw = selectConsistentFlights(airborneFlights);
            transformedData = selectedRaw.map(transformToSchema);
        }

        broadcastFlights(transformedData);
        
    } catch (err) {
        logger.error("API Failure. Fallback to mock data.", err);
        broadcastFlights(generateMockFlights());
    }
};

/**
 * Generates realistic phantom flights over India to keep the UI active.
 */
function generateMockFlights() {
    return [
        {
            id: "mock_001",
            callsign: "MOCK771",
            latitude: 28.5,
            longitude: 77.1, 
            altitude: 10500,
            velocity: 240,
            vertical_rate: 0,
            heading: 90,
            direction: "level",
            isMock: true
        },
        {
            id: "mock_002",
            callsign: "MOCK402",
            latitude: 19.1,
            longitude: 72.8,
            altitude: 8200,
            velocity: 180,
            vertical_rate: -2,
            heading: 270,
            direction: "descending",
            isMock: true
        }
    ];
}

/**
 * Slightly relaxed filters to catch more regional traffic.
 */
function validateAndFilter(f) {
    return (
        f[8] === false && // airborne
        f[9] > 30 &&      // velocity > 30 m/s
        f[7] > 1000 &&    // altitude > 1000m
        f[5] !== null &&  
        f[6] !== null     
    );
}

/**
 * Transforms raw API array into the exact structured JSON schema requested.
 */
function transformToSchema(f) {
    const verticalRate = f[11] || 0;
    
    return {
        id: f[0],
        callsign: f[1]?.trim() || "N/A",
        latitude: f[6],
        longitude: f[5],
        altitude: Math.round(f[7]),
        velocity: Math.round(f[9]),
        vertical_rate: verticalRate,
        direction: verticalRate > 0.5 ? "climbing" : verticalRate < -0.5 ? "descending" : "level"
    };
}
