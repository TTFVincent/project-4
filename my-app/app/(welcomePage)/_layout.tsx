import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import React from "react";
export default function sideNav() {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="welcomePage" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </NativeBaseProvider>
  );
}
