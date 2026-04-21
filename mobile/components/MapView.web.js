import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function FlightMap({ flights = [] }) {
    return (
        <View style={styles.webContainer}>
            <View style={styles.webHeader}>
                <Text style={styles.webTitle}>SKYTRACK <Text style={styles.accent}>PRO</Text></Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>GROUND CONTROL MODE</Text>
                </View>
                <Text style={styles.webSubtitle}>
                    Active monitoring of {flights.length} aircraft in Indian Airspace.
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
                {flights.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>📡 SIGNAL SEARCHING...</Text>
                    </View>
                ) : (
                    flights.map((item) => (
                        <View key={item.id} style={styles.flightCard}>
                            <View style={styles.cardMain}>
                                <View>
                                    <Text style={styles.callsign}>{item.callsign || "N/A"}</Text>
                                    <Text style={styles.icao}>ICAO: {item.id ? item.id.toUpperCase() : "UNKNOWN"}</Text>
                                </View>
                                <View style={styles.statusSection}>
                                    <View style={[styles.indicator, { backgroundColor: item.trend === 'climbing' ? '#34C759' : item.trend === 'descending' ? '#FF3B30' : '#FFD60A' }]} />
                                    <Text style={styles.directionText}>{(item.trend || "stable").toUpperCase()}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.statsGrid}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>ALTITUDE</Text>
                                    <Text style={styles.statValue}>{item.altitude || 0}m</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>VELOCITY</Text>
                                    <Text style={styles.statValue}>{item.speed || 0}m/s</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>HEADING</Text>
                                    <Text style={styles.statValue}>{item.heading || 0}°</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        backgroundColor: "#000",
        padding: 40,
    },
    webHeader: {
        marginBottom: 40,
        borderLeftWidth: 4,
        borderLeftColor: "#007AFF",
        paddingLeft: 20,
    },
    webTitle: {
        fontSize: 32,
        fontWeight: "900",
        color: "#FFF",
        letterSpacing: 2,
    },
    accent: {
        color: "#007AFF",
    },
    badge: {
        backgroundColor: "rgba(0, 122, 255, 0.15)",
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(0, 122, 255, 0.3)",
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#007AFF",
        letterSpacing: 1,
    },
    webSubtitle: {
        fontSize: 16,
        color: "#8E8E93",
        marginTop: 15,
        fontWeight: "500",
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    flightCard: {
        backgroundColor: "#1C1C1E",
        borderRadius: 12,
        padding: 24,
        width: 350,
        borderWidth: 1,
        borderColor: "#2C2C2E",
    },
    cardMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    callsign: {
        fontSize: 24,
        fontWeight: "800",
        color: "#FFF",
    },
    icao: {
        fontSize: 12,
        color: "#8E8E93",
        marginTop: 4,
        fontWeight: "600",
    },
    statusSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    directionText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#FFF",
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: "#2C2C2E",
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: "800",
        color: "#8E8E93",
        letterSpacing: 0.5,
        marginBottom: 5,
    },
    statValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFF",
    },
    emptyState: {
        flex: 1,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#333',
        borderRadius: 20,
        width: '100%',
    },
    emptyText: {
        color: "#444",
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 2,
    },
});
