import { WebSocketServer } from "ws";
import logger from "../utils/logger.js";

let wss;

/**
 * Socket Manager to handle client lifecycle and efficient broadcasting.
 */
export const initWebSocket = (server) => {
    wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        logger.socket(`New client connected. Active: ${wss.clients.size}`);

        ws.on("close", () => {
            logger.socket(`Client disconnected. Active: ${wss.clients.size}`);
        });

        ws.on("error", (err) => {
            logger.error("WebSocket client error", err);
        });
    });
};

/**
 * Broadcasts data to all active listeners.
 */
export const broadcastFlights = (data) => {
    if (!wss) return;

    const payload = JSON.stringify(data);
    
    wss.clients.forEach((client) => {
        if (client.readyState === 1) { // OPEN
            client.send(payload);
        }
    });
};
