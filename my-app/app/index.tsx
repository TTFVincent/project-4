import { Redirect } from "expo-router";
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import { getStorageValue } from "../constants/Storage";
import { useTokenStore } from "../zustand/useTokenStore";
import { Text } from "react-native";

export default function index() {
  const tokenState = useTokenStore((store) => store.state);
  const setTokenState = useTokenStore((store) => store.setState);

  useEffect(() => {
    async function loadToken() {
      let token = await getStorageValue("token");
      setTokenState(token);
    }

    loadToken();
  }, []);

  return (
    <NativeBaseProvider>
      {tokenState.type === "loading" ? (
        <Text>Loading user data...</Text>
      ) : tokenState.token ? (
        <Redirect href={"/planTrip"} />
      ) : (
        <Redirect href={"/welcomePage"} />
      )}
    </NativeBaseProvider>
  );
}
