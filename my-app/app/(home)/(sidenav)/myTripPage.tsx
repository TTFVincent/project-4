import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { View } from "../../../components/Themed";
import { colour_container_bg } from "../../../components/css/colors";
import BasicSwipeList from "../../../components/SwipeList";
import { Trip, sampleTrip } from "../../../constants/TripLocation";
import { useTrip } from "../../../context/personalTripContext";

export default function MyTripPage() {
  const tripsContext = useTrip();
  if (!tripsContext) {
    throw new Error("tripsContext not found");
  }
  const [tripsData, setTripsData] = useState<Trip[]>(tripsContext.trips);
  return <BasicSwipeList data={tripsData} setData={setTripsData} />;
}

const styles = StyleSheet.create({});
