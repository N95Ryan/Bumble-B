import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashsignUp"
        options={{
          title: "Inscription",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "albums" : "albums-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Tableau de bord",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "albums" : "albums-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
