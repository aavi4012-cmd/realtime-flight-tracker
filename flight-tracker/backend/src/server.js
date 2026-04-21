import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import { initWebSocket } from "./websocket/socketManager.js";
import { startFlightPolling } from "./services/flightService.js";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
    res.json({ 
        status: "UP",
        timestamp: new Date().toISOString()
    });
});

const server = app.listen(PORT, "0.0.0.0", () => {
    logger.info(`SkyTrack Backend operational on port ${PORT} [Mode: Render-Aligned]`);
});

// Initialize modular systems
initWebSocket(server);
startFlightPolling();