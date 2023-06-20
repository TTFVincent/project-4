import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { View } from "../../../components/Themed";
import { colour_container_bg } from "../../../components/css/colors";
import BasicSwipeList from "../../../components/SwipeList";
import { Trip, sampleTrip } from "../../../constants/TripLocation";

export default function myTripPage() {
  const [tripsData, setTripsData] = useState<Trip[]>([
    sampleTrip,
    sampleTrip,
    sampleTrip,
  ]);
  return <BasicSwipeList data={tripsData} setData={setTripsData} />;
}

const styles = StyleSheet.create({});
