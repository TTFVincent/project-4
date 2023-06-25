import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { View } from "../../components/Themed";
import { usePromptStore } from "../../zustand/usePromptStore";
import { colour_container_bg } from "../../components/css/colors";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useTokenStore } from "../../zustand/useTokenStore";
import BasicSwipeList from "../../components/SwipeList";
import { TripLocation, sampleTrip } from "../../constants/TripLocation";
import Map from "../../components/Map";
import { useLocalSearchParams } from "expo-router";
import {
  UseChatGPTResponse,
  useChatGPTResponse,
} from "../../zustand/useChatGPTResponseStore";

export default function tripRoutePage() {
  const response = useChatGPTResponse(
    (state: UseChatGPTResponse) => state.response
  );
  if (!response) throw new Error("Invalid trip");
  const { locationId, extra } = useLocalSearchParams();
  const [tripData, setTripData] = useState<TripLocation[]>(response);

  return (
    <View style={styles.container}>
      <Map data={tripData} defaultLocationId={locationId as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colour_container_bg,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    color: "red",
  },
});
