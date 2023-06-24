import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import React from "react";
export default function sideNav() {
  return (
    <NativeBaseProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontFamily: "RobotoMono",
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="welcomePage" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "" }} />
        <Stack.Screen name="register" options={{ title: "" }} />
        <Stack.Screen name="test" />
      </Stack>
    </NativeBaseProvider>
  );
}
