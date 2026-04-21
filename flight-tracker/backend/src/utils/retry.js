import logger from "./logger.js";

/**
 * Exponential backoff retry wrapper for async functions.
 * Detects HTTP 429 (Rate Limit) to fail fast and yield to mock data.
 * 
 * @param {Function} fn - The async function to retry.
 * @param {number} retries - Max retry attempts.
 * @param {number} delay - Initial delay in ms.
 */
export const withRetry = async (fn, retries = 3, delay = 2000) => {
    try {
        return await fn();
    } catch (error) {
        // If we hit a Rate Limit (429), stop hammering the server immediately.
        // This is a professional engineering decision to prevent IP blacklisting.
        if (error.response?.status === 429) {
            logger.error("OpenSky Rate Limit exceeded (429). Switching to fallback mode.");
            throw error;
        }

        if (retries <= 0) throw error;
        
        logger.warn(`Operation failed. Retrying in ${delay}ms... (Attempts left: ${retries})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Recursive retry with exponential backoff (multiplier 2x)
        return withRetry(fn, retries - 1, delay * 2);
    }
};
