import { StyleSheet, Platform } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { usePromptStore } from "../../zustand/usePromptStore";
import { colour_constainer_bg } from "../../components/css/colors";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useTokenStore } from "../../zustand/useTokenStore";
import MapViewDirections from "react-native-maps-directions";
//@ts-ignore
import { GOOGLE_MAP_KEY } from "@env";
import { useState } from "react";
const image = require("../../assets/images/favicon.png");

type Coordinates = {
  latitude: number;
  longitude: number;
}[];

export default function TabTwoScreen() {
  const prompt = usePromptStore((state: any) => state.promptList);
  const showDate = useRegisterStore((state: any) => state.showDate);
  const token = useTokenStore((state: any) => state.access_token);

  const [coordinateState, setCoordinateState] = useState<Coordinates | null>([
    {
      latitude: 22.326299626506476,
      longitude: 114.16930105529963,
    },
    {
      latitude: 22.326259626506476,
      longitude: 114.16530105529963,
    },
    {
      latitude: 22.326253626506476,
      longitude: 114.16340105529963,
    },
  ]);

  return (
    <View style={styles.container}>
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
          return (
            <Marker
              onPress={() => {
                console.log("press");
              }}
              key={i}
              image={image}
              coordinate={value}
            />
          );
        })}
        {coordinateState?.map((value, i) => {
          return (
            <MapViewDirections
              origin={coordinateState[Number(i)]}
              destination={coordinateState[Number(i) + 1]}
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={5}
              strokeColor="#1967d2"
            />
          );
        })}
      </MapView>

      <Text style={styles.text}>{prompt}</Text>
      <Text style={styles.text}>{GOOGLE_MAP_KEY}</Text>
      <Text style={styles.text}>token: {token}</Text>
    </View>
  );
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
