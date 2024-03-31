import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { bodyFonts } from "@/theme/fonts";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#036CA7",
        tabBarStyle: {
          height: 60,
          justifyContent: "center",
          paddingTop: 6,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: bodyFonts.regular,
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "หน้าหลัก",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "งาน",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="tasks" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
