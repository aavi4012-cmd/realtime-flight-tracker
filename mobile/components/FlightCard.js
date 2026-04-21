import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

/**
 * Detailed information card for the bottom panel.
 * Displays aircraft telemetry with professional indicators.
 */
const FlightCard = ({ flight }) => {
  const { callsign = "N/A", altitude = 0, velocity = 0, direction = "level", id = "UNKNOWN" } = flight;
  
  const trendSymbol = direction === 'climbing' ? '↑' : direction === 'descending' ? '↓' : '→';
  const trendColor = direction === 'climbing' ? '#34C759' : direction === 'descending' ? '#FF3B30' : '#FFD60A';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.callsign}>{callsign}</Text>
        <View style={[styles.trendBadge, { backgroundColor: trendColor }]}>
            <Text style={styles.trendText}>{trendSymbol} {(direction || "level").toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statsRow}>
        <View style={styles.statContainer}>
            <Text style={styles.statLabel}>ALTITUDE</Text>
            <Text style={styles.statValue}>{altitude} m</Text>
        </View>
        <View style={styles.statContainer}>
            <Text style={styles.statLabel}>VELOCITY</Text>
            <Text style={styles.statValue}>{velocity} m/s</Text>
        </View>
        <View style={styles.statContainer}>
            <Text style={styles.statLabel}>ICAO</Text>
            <Text style={styles.statValue}>{(id || "UNKNOWN").toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  callsign: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
  },
  trendBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statContainer: {
    flex: 1,
  },
  statLabel: {
    fontSize: 9,
    color: '#8E8E93',
    fontWeight: '700',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default FlightCard;
