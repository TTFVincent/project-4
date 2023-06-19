import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';
import Colors from "../../constants/Colors";
import { useTokenStore } from "../../zustand/useTokenStore";
import { color_header_backGround } from "../../components/css/colors";
import { Button } from "native-base";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Stack
      initialRouteName="calendarPage"
      screenOptions={{
        title: "Your Trip",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#333333",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <Pressable onPress={router.back}>
            <FontAwesome
              size={28}
              style={{ marginBottom: 0 }}
              name="arrow-left"
            />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="tripRoutePage"
        options={{
          // href: isLoginToken ? "/googleMap" : "/",
          headerRight: () => (
            <Pressable onPress={() => router.replace("/calendarPage")}>
              <FontAwesome
                size={28}
                style={{ marginBottom: 0, marginEnd: 5 }}
                name="calendar"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="calendarPage"
        options={{
          // href: isLoginToken ? "/googleMap" : "/",
          headerRight: () => (
            <Pressable onPress={() => router.replace("/tripRoutePage")}>
              <FontAwesome
                size={28}
                style={{ marginBottom: 0, marginEnd: 5 }}
                name="map"
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
