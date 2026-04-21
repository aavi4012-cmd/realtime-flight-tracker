import { Tabs } from 'expo-router';
import React from 'react';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 1,
          borderTopColor: '#1C1C1E',
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginBottom: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'MONITOR',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="airplane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'SYSTEM',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="terminal" color={color} />,
        }}
      />
    </Tabs>
  );
}
