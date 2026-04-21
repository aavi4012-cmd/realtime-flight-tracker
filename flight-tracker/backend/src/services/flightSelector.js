import logger from "../utils/logger.js";

let currentTrackedIds = [];

/**

 * @param {Array} airborneFlights 
 * @returns {Array} 
 */
export const selectConsistentFlights = (airborneFlights) => {
    if (airborneFlights.length === 0) {
        currentTrackedIds = [];
        return [];
    }

    // 1. Find which of our currently tracked flights are still airborne
    const stillAirborne = airborneFlights.filter(f => currentTrackedIds.includes(f[0]));

    // 2. Find new candidates that weren't already tracked
    const newCandidates = airborneFlights.filter(f => !currentTrackedIds.includes(f[0]));

    // 3. Combine them, prioritizing the existing ones for UI stability
    // We strictly take up to 2 as per requirement
    const combined = [...stillAirborne, ...newCandidates].slice(0, 2);

    // 4. Update the tracker state for the next cycle
    currentTrackedIds = combined.map(f => f[0]);

    if (combined.length > 0) {
        logger.info(`Tracked ${combined.length} flights. IDs: ${currentTrackedIds.join(', ')}`);
    }

    return combined;
};
