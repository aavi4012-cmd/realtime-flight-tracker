import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from "react-native";
import FlightMap from "../../components/MapView";
import FlightCard from "../../components/FlightCard";
import socketService from "../../services/socket.js";

interface Flight {
  id: string;
  callsign: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  vertical_rate: number;
  heading: number;
  direction: "climbing" | "descending" | "level";
}

// Dynamic backend URL for production/development parity
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "ws://localhost:3000";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string>("Initializing...");

  useEffect(() => {
    socketService.connect(BACKEND_URL);
    const removeData = socketService.onData((data: Flight[]) => {
      setFlights(data);
      setLastSync(new Date().toLocaleTimeString());
    });
    
    // Immediate status feedback to prevent 'Initializing' hang
    const removeStatus = socketService.onStatusChange((status: boolean) => {
        setIsConnected(status);
        if (status && lastSync === "Initializing...") {
            setLastSync("LINK ESTABLISHED");
        }
    });

    return () => {
      removeData();
      removeStatus();
      socketService.disconnect();
    };
  }, []);

  const isMockMode = flights.length > 0 && flights[0].id.startsWith("mock_");

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      
      {/* Precision Navigation Header */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.brandTitle}>SKYTRACK <Text style={styles.brandAccent}>PRO</Text></Text>
            <View style={styles.locationContainer}>
              <View style={[styles.statusDot, { backgroundColor: isMockMode ? '#007AFF' : isConnected ? '#34C759' : '#FF3B30' }]} />
              <Text style={styles.regionText}>
                {isMockMode ? "SIMULATED DATA" : `REFRESHED: ${lastSync}`}
              </Text>
            </View>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{flights.length}</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Primary Map View */}
      <View style={styles.main}>
        <FlightMap flights={flights} />
        
        {/* Connection Toast */}
        {!isConnected && (
            <View style={styles.statusToast}>
                <ActivityIndicator size="small" color="#FFF" />
                <Text style={styles.toastText}>RECONNECTING TO GROUND STATION...</Text>
            </View>
        )}

        {/* Telemetry Bottom Panel */}
        {flights.length > 0 && (
            <View style={styles.telemetryPanel}>
                <ScrollView 
                    horizontal 
                    pagingEnabled 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {flights.map(f => (
                        <FlightCard key={f.id} flight={f} />
                    ))}
                </ScrollView>
            </View>
        )}

        {/* Empty State Overlay */}
        {flights.length === 0 && isConnected && (
          <View style={styles.overlay}>
             <View style={styles.scannerLine} />
             <Text style={styles.overlayTitle}>SEARCHING AIRSPACE</Text>
             <Text style={styles.overlaySubtitle}>Waiting for active radar return...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
  },
  brandAccent: {
    color: '#007AFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  regionText: {
    fontSize: 10,
    color: '#8E8E93',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  countBadge: {
    backgroundColor: '#1C1C1E',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  countText: {
    color: '#007AFF',
    fontWeight: '800',
    fontSize: 16,
  },
  main: {
    flex: 1,
  },
  statusToast: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 50,
  },
  toastText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 10,
  },
  telemetryPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  scannerLine: {
    width: 200,
    height: 2,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    marginBottom: 20,
  },
  overlayTitle: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
  },
  overlaySubtitle: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 8,
  },
});
