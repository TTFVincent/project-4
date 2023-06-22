import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, Platform } from "react-native";
import MapView, {
  Callout,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import {
  Text,
  Box,
  NativeBaseProvider,
  Image,
  HStack,
  Center,
} from "native-base";
import MapViewDirections from "react-native-maps-directions";
import { TripLocation } from "../constants/TripLocation";
import { env } from "../config/env";
import { globalStyles } from "../config/style";
import { getLocationImage } from "./locationImage";

const image = require("../assets/images/favicon.png");

export default function Map(props: {
  data: TripLocation[];
  defaultLocationId?: string;
}) {
  const [region, setRegion] = useState<Region>({
    latitude: props.defaultLocationId
      ? +props.data[+props.defaultLocationId].latitude
      : +props.data[0].latitude,
    longitude: props.defaultLocationId
      ? +props.data[+props.defaultLocationId].longitude
      : +props.data[0].longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const mapViewRef = useRef<MapView>(null);
  const [locationPhotos, setLocationPhotos] = useState<string[][]>([]);

  async function loadTripLocationPhotos() {
    const res = await Promise.all(
      props.data.map((tripLocation) => getLocationImage(tripLocation.location))
    ).then((data) => {
      return data;
    });
    console.log("res", res);
    setLocationPhotos(res);
    console.log(locationPhotos[0][0]);
  }

  useEffect(() => {
    console.log("adc");
    loadTripLocationPhotos();
  }, []);

  return (
    <MapView
      ref={mapViewRef}
      style={styles.mapContainer}
      provider={PROVIDER_GOOGLE}
      region={region}
      onRegionChangeComplete={(reg, e) => {}}
    >
      {props.data.map((value, i) => {
        return (
          <Marker
            key={i}
            coordinate={{
              latitude: +value.latitude,
              longitude: +value.longitude,
            }}
            onPress={(e) => {
              mapViewRef.current?.animateToRegion(
                {
                  ...e.nativeEvent.coordinate,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                },
                200
              );
              setRegion({
                ...e.nativeEvent.coordinate,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              });
            }}
          >
            <Callout>
              <NativeBaseProvider>
                <Center>
                  {locationPhotos[i] && (
                    <HStack space={1} justifyContent="space-evenly">
                      {locationPhotos[i].map((locationPhotoURI, j) => {
                        return (
                          <Image
                            key={j}
                            source={{ uri: locationPhotoURI }}
                            alt={`${value.location} ${j}`}
                            style={{ width: 100, height: 100 }}
                          ></Image>
                        );
                      })}
                    </HStack>
                  )}
                  <Text>{value.location}</Text>
                </Center>
              </NativeBaseProvider>
            </Callout>
          </Marker>
        );
      })}
      {props.data.map((value, i) => {
        return (
          <MapViewDirections
            key={i}
            origin={{
              latitude: +props.data[i].latitude,
              longitude: +props.data[i].longitude,
            }}
            mode={"DRIVING"}
            destination={{
              latitude: +props.data[i + 1]?.latitude,
              longitude: +props.data[i + 1]?.longitude,
            }}
            apikey={env.GOOGLE_MAP_KEY}
            strokeWidth={5}
            strokeColor={"#1967d2"}
          />
        );
      })}
    </MapView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.containerBackgroundColor,
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
