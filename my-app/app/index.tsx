import { Redirect, useRouter } from "expo-router";
import { NativeBaseProvider, useToken } from "native-base";
import React, { useEffect, useState } from "react";
import { getStorageValue } from "../constants/Storage";
import { useTokenStore } from "../zustand/useTokenStore";
import { Text } from "react-native";

export default function index() {
  const router = useRouter();

  const tokenState = useTokenStore((store) => store.state);
  const setTokenState = useTokenStore((store) => store.setState);

  useEffect(() => {
    async function loadToken() {
      let token = await getStorageValue("token");
      setTokenState(token);
      // if (token) {
      //   router.push("/planTrip");
      // } else {
      //   router.push("/welcomePage");
      // }
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
