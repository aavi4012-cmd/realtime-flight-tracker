/**
 * WebSocket Service for real-time flight tracking updates.
 * Handles connections, reconnections, and message parsing.
 */

class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = [];
        this.statusListeners = [];
        this.reconnectTimeout = 3000;
        this.url = '';
    }

    /**
     * Initialize connection to the backend.
     * @param {string} url - WebSocket server URL.
     */
    connect(url) {
        this.url = url;
        console.log(`[SocketService] Connecting to ${url}...`);

        try {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                console.log('[SocketService] Connected');
                this.notifyStatusListeners(true);
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.notifyListeners(data);
                } catch (err) {
                    console.error('[SocketService] Error parsing message:', err);
                }
            };

            this.socket.onclose = () => {
                console.log('[SocketService] Disconnected. Reconnecting...');
                this.notifyStatusListeners(false);
                setTimeout(() => this.connect(this.url), this.reconnectTimeout);
            };

            this.socket.onerror = (err) => {
                console.error('[SocketService] Socket error:', err.message);
                this.socket.close();
            };
        } catch (err) {
            console.error('[SocketService] Connection failed:', err);
            setTimeout(() => this.connect(this.url), this.reconnectTimeout);
        }
    }

    /**
     * Add a listener for flight data updates.
     */
    onData(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    /**
     * Add a listener for connection status changes.
     */
    onStatusChange(callback) {
        this.statusListeners.push(callback);
        return () => {
            this.statusListeners = this.statusListeners.filter(l => l !== callback);
        };
    }

    notifyListeners(data) {
        this.listeners.forEach(callback => callback(data));
    }

    notifyStatusListeners(status) {
        this.statusListeners.forEach(callback => callback(status));
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

const socketService = new SocketService();
export default socketService;
