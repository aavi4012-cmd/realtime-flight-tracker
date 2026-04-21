/**
 * Simple structured logger for backend events.
 * Consistent logging is key for production observability.
 */
const logger = {
    info: (msg, meta = {}) => {
        console.log(`[${new Date().toISOString()}] INFO: ${msg}`, Object.keys(meta).length ? meta : '');
    },
    error: (msg, err = {}) => {
        console.error(`[${new Date().toISOString()}] ERROR: ${msg}`, err.message || err);
    },
    warn: (msg, meta = {}) => {
        console.warn(`[${new Date().toISOString()}] WARN: ${msg}`, meta);
    },
    socket: (msg) => {
        console.log(`[${new Date().toISOString()}] 📡 SOCKET: ${msg}`);
    }
};

export default logger;
