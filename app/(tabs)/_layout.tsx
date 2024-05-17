import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="login"
        options={{
          title: 'Connexion',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={28}/>
          ),
        }}
      />
      
      <Tabs.Screen
        name="signUp"
        options={{
          title: 'Inscription',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'account-plus' : 'account-plus-outline'} color={color} size={28}/>
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Tableau de bord',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'chart-box' : 'chart-box-outline'} color={color} size={28}/>
          ),
        }}
      />
    </Tabs>
  );
}