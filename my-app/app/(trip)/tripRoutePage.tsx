import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { Text, View } from "../../components/Themed";
import { usePromptStore } from "../../zustand/usePromptStore";
import { colour_container_bg } from "../../components/css/colors";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useTokenStore } from "../../zustand/useTokenStore";
import BasicSwipeList from "../../components/SwipeList";
import { TripLocation, sampleTrip } from "../../constants/TripLocation";
import Map from "../../components/Map";
import { useLocalSearchParams } from "expo-router";

export default function tripRoutePage() {
  const { locationId, extra } = useLocalSearchParams();
  const prompt = usePromptStore((state: any) => state.promptList);
  const showDate = useRegisterStore((state: any) => state.showDate);
  const token = useTokenStore((state: any) => state.access_token);
  const [tripData, setTripData] = useState<TripLocation[]>(sampleTrip);

  return (
    <View style={styles.container}>
      <Map data={tripData} defaultLocationId={locationId as string} />
      {/* <Text style={styles.text}>{prompt}</Text>
      <Text style={styles.text}>{GOOGLE_MAP_KEY}</Text>
      <Text style={styles.text}>token: {token}</Text> 
    <BasicSwipeList data={tripData} setData={setTripData} />*/}
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
