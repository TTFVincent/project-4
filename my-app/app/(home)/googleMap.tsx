import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { Text, View } from "../../components/Themed";
import { usePromptStore } from "../../zustand/usePromptStore";
import { colour_constainer_bg } from "../../components/css/colors";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useTokenStore } from "../../zustand/useTokenStore";
import BasicSwipeList from "../../components/SwipeList";
import { TripLocation, sampleTrip } from "../../constants/TripLocation";
import Map from "../../components/Map";

export default function TabTwoScreen() {
  const prompt = usePromptStore((state: any) => state.promptList);
  const showDate = useRegisterStore((state: any) => state.showDate);
  const token = useTokenStore((state: any) => state.access_token);
  const [tripData, setTripData] = useState<TripLocation[]>(sampleTrip);
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <BasicSwipeList data={tripData} setData={setTripData} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Map data={tripData} />
        {/* <Text style={styles.text}>{prompt}</Text>
      <Text style={styles.text}>{GOOGLE_MAP_KEY}</Text>
      <Text style={styles.text}>token: {token}</Text> */}
        <BasicSwipeList data={tripData} setData={setTripData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colour_constainer_bg,

    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mapContainer: {
    height: "50%",
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
