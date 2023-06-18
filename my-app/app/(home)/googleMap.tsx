import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View } from "../../components/Themed";
import { usePromptStore } from "../../zustand/usePromptStore";
import { colour_container_bg } from "../../components/css/colors";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useTokenStore } from "../../zustand/useTokenStore";
import MapViewDirections from "react-native-maps-directions";
//@ts-ignore
import { GOOGLE_MAP_KEY } from "@env";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BasicSwipeList from "../../components/SwipeList";
import { TripLocation, sampleTrip } from "../../constants/TripLocation";

const image = require("../../assets/images/favicon.png");

type Coordinates = {
  latitude: number;
  longitude: number;
}[];

export default function TabTwoScreen() {
  const prompt = usePromptStore((state: any) => state.promptList);
  const showDate = useRegisterStore((state: any) => state.showDate);
  const token = useTokenStore((state: any) => state.access_token);
  const [tripData, setTripData] = useState<TripLocation[]>(sampleTrip);

  return (
    <View style={styles.container}>
      <Map />
      <Text style={styles.text}>{prompt}</Text>
      <Text style={styles.text}>{GOOGLE_MAP_KEY}</Text>
      <Text style={styles.text}>token: {token}</Text>
      <BasicSwipeList data={tripData} setData={setTripData} />
    </View>
  );
}

function Map() {
  const [coordinateState, setCoordinateState] = useState<Coordinates | null>([
    {
      latitude: 22.2758,
      longitude: 114.1455,
    },
    {
      latitude: 22.291,
      longitude: 114.1686,
    },
    {
      latitude: 22.3067,
      longitude: 114.1725,
    },
    {
      latitude: 22.2809,
      longitude: 114.1561,
    },
  ]);

  return (
    <MapView
      style={styles.mapContainer}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 22.343813260980898,
        longitude: 114.1887436490869,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
    >
      {coordinateState?.map((value, i) => {
        return <Marker key={i} onPress={() => {}} coordinate={value} />;
      })}
      {coordinateState?.map((value, i) => {
        return (
          <MapViewDirections
            key={i}
            origin={coordinateState[Number(i)]}
            mode={"DRIVING"}
            destination={coordinateState[Number(i) + 1]}
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={5}
            strokeColor={i % 2 == 0 ? "#1967d2" : "#a0e630"}
          />
        );
      })}
    </MapView>
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
