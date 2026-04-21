import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";

/**
 * Custom Marker component with AnimatedRegion and Heading Rotation.
 */
const AnimatedFlightMarker = ({ flight }) => {
    const { latitude, longitude, heading, callsign, altitude, velocity, direction } = flight;
    
    const animatedCoord = useRef(new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
    })).current;

    useEffect(() => {
        // Precise movement animation over the polling cycle (15s)
        animatedCoord.timing({
            latitude: latitude,
            longitude: longitude,
            duration: 14000, 
            useNativeDriver: false,
        }).start();
    }, [latitude, longitude]);

    // Trend icon mapping for industrial aesthetic
    const trendIcon = direction === 'climbing' ? '↑' : direction === 'descending' ? '↓' : '→';

    return (
        <Marker.Animated
            key={flight.id}
            coordinate={animatedCoord}
            title={`${callsign} [${trendIcon}]`}
            description={`${altitude}m | ${velocity}m/s`}
            tracksViewChanges={false}
        >
            <View style={[styles.markerContainer, { transform: [{ rotate: `${heading}deg` }] }]}>
                <View style={styles.planeBackground}>
                    <Text style={styles.planeEmoji}>✈️</Text>
                </View>
                <View style={styles.shadowRadial} />
            </View>
        </Marker.Animated>
    );
};

export default function FlightMap({ flights }) {
    const INDIA_REGION = {
        latitude: 22.0,
        longitude: 78.0,
        latitudeDelta: 18,
        longitudeDelta: 18,
    };

    return (
        <MapView
            style={styles.map}
            initialRegion={INDIA_REGION}
            showsCompass={true}
            rotateEnabled={true}
            mapType="mutedStandard"
            customMapStyle={silverMapStyle}
        >
            {flights.map((f) => (
                <AnimatedFlightMarker key={f.id} flight={f} />
            ))}
        </MapView>
    );
}

const silverMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#d9e3f0" }] }
];

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
    },
    planeBackground: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 10,
    },
    planeEmoji: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    shadowRadial: {
        position: 'absolute',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 122, 255, 0.15)',
        zIndex: 1,
    }
});