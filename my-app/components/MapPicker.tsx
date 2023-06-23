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
import Geocoder from "react-native-geocoding";

Geocoder.init(env.GOOGLE_MAP_KEY, { language: "en" });

export default function MapPicker(props: {
  defaultLocation: LatLng;
  setRegionString: Dispatch<SetStateAction<string>>;
}) {
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng>(
    props.defaultLocation
  );

  useEffect(() => {
    setRegionStringByRegion;
  }, []);

  async function setRegionStringByRegion(region: Region): Promise<void> {
    const json = await Geocoder.from(region.latitude, region.longitude);
    const addressComponent = json.results[0].address_components;
    const politicalComponents = addressComponent.filter((component) =>
      component.types.includes("political")
    );
    const locationStrings = politicalComponents.map(
      (component) => component.long_name
    );
    const locationString = locationStrings.join(", ");
    console.log(locationString);
    props.setRegionString(locationString);
  }

  return (
    <MapView
      style={styles.mapContainer}
      provider={PROVIDER_GOOGLE}
      region={{
        ...props.defaultLocation,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
      onRegionChange={(region) =>
        setMarkerCoordinates({
          latitude: region.latitude,
          longitude: region.longitude,
        })
      }
      onRegionChangeComplete={(region) => setRegionStringByRegion(region)}
    >
      <Marker coordinate={markerCoordinates} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    width: "100%",
  },
});
