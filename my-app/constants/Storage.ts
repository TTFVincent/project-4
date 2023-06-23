import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export async function setStorageValue(
  key: string,
  value: string
): Promise<void> {
  Platform.OS === "web"
    ? await AsyncStorage.setItem(key, value)
    : await SecureStore.setItemAsync(key, value);

  // await AsyncStorage.setItem(key, value);
}

export async function deleteStorageValue(key: string): Promise<void> {
  Platform.OS === "web"
    ? await AsyncStorage.removeItem(key)
    : await SecureStore.deleteItemAsync(key);

  // await AsyncStorage.removeItem(key);
}

export async function getStorageValue(key: string): Promise<string | null> {
  const result =
    Platform.OS === "web"
      ? await AsyncStorage.getItem(key)
      : await SecureStore.getItemAsync(key);
  return result;

  // return await AsyncStorage.getItem(key);
}
