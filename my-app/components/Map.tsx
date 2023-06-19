import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colour_constainer_bg } from "../components/css/colors";
import MapViewDirections from "react-native-maps-directions";
//@ts-ignore
import { GOOGLE_MAP_KEY } from "@env";
import { TripLocation } from "../constants/TripLocation";

const image = require("../assets/images/favicon.png");

export default function Map(props: {
  data: TripLocation[];
  defaultLocationId?: string;
}) {
  return (
    <MapView
      style={styles.mapContainer}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: props.defaultLocationId
          ? +props.data[+props.defaultLocationId].latitude
          : +props.data[2].latitude,
        longitude: props.defaultLocationId
          ? +props.data[+props.defaultLocationId].longitude
          : +props.data[2].longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {props.data.map((value, i) => {
        return (
          <Marker
            key={i}
            onPress={() => {
              console.log("press");
            }}
            image={image}
            coordinate={{
              latitude: +value.latitude,
              longitude: +value.longitude,
            }}
          />
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
    backgroundColor: colour_constainer_bg,

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
