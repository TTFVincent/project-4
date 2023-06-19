import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

async function saveValue(key: string, value: string): Promise<void> {
  Platform.OS === "web"
    ? await AsyncStorage.setItem(key, value)
    : await SecureStore.setItemAsync(key, value);
}

async function deleteValue(key: string): Promise<void> {
  Platform.OS === "web"
    ? await AsyncStorage.removeItem(key)
    : await SecureStore.deleteItemAsync(key);
}

async function getValueFor(key: string): Promise<string | null> {
  const result =
    Platform.OS === "web"
      ? await AsyncStorage.getItem(key)
      : await SecureStore.getItemAsync(key);
  return result;
}
