import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Platform } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>SYSTEM <Text style={styles.accent}>SPECS</Text></Text>
          <Text style={styles.version}>NODE_V2.4.0-STABLE</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATA PIPELINE</Text>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>SOURCE</Text>
            <Text style={styles.cardValue}>OpenSky Network (REST API)</Text>
            <View style={styles.spacer} />
            <Text style={styles.cardLabel}>POLLING FREQUENCY</Text>
            <Text style={styles.cardValue}>1.0Hz (Every 10 Seconds)</Text>
            <View style={styles.spacer} />
            <Text style={styles.cardLabel}>GEO-FILTERING</Text>
            <Text style={styles.cardValue}>Indian Airspace (8N-37N, 68E-97E)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NETWORK TOPOLOGY</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.dot} />
              <Text style={styles.nodeText}>Express Server (Port 3000)</Text>
            </View>
            <View style={styles.connector} />
            <View style={styles.row}>
              <View style={styles.dot} />
              <Text style={styles.nodeText}>WebSocket Broadcast (ws://)</Text>
            </View>
            <View style={styles.connector} />
            <View style={styles.row}>
              <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
              <Text style={styles.nodeText}>React Native Client (Expo)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FILTERING LOGIC</Text>
          <View style={styles.card}>
            <Text style={styles.logicItem}>• On Ground: FALSE</Text>
            <Text style={styles.logicItem}>• Vertical Threshold: > 3,000m</Text>
            <Text style={styles.logicItem}>• Velocity Minimum: 50m/s</Text>
            <Text style={styles.logicItem}>• GPS Precision: Required</Text>
          </View>
        </View>

        <Text style={styles.footer}>© 2026 SKYTRACK MISSION CONTROL</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 2,
  },
  accent: {
    color: '#007AFF',
  },
  version: {
    fontSize: 10,
    color: '#34C759',
    fontWeight: '800',
    marginTop: 4,
  },
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8E8E93',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#007AFF',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  spacer: {
    height: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34C759',
    marginRight: 12,
  },
  nodeText: {
    fontSize: 14,
    color: '#E5E5EA',
    fontWeight: '500',
  },
  connector: {
    width: 1,
    height: 20,
    backgroundColor: '#3A3A3C',
    marginLeft: 2.5,
    marginVertical: 4,
  },
  logicItem: {
    fontSize: 14,
    color: '#BCBCC0',
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  footer: {
    textAlign: 'center',
    color: '#48484A',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 40,
  },
});
