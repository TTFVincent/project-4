import React from "react";
import { Box, NativeBaseProvider, Pressable, Text } from "native-base";
import { StyleSheet, SafeAreaView } from "react-native";
import WeekView, { WeekViewEvent } from "react-native-week-view";
import { TripLocation } from "../constants/TripLocation";
import { useRouter } from "expo-router";

const myEvents: WeekViewEvent[] = [
  {
    id: 1,
    startDate: new Date(2023, 1, 20, 9),
    endDate: new Date(2023, 1, 20, 11),
    color: "blue",
    title: "Meeting",
    description: "E1",
    resolveOverlap: "lane",
    stackKey: "",
    eventKind: "standard",
  },
  {
    id: 2,
    startDate: new Date(2023, 1, 22, 10),
    endDate: new Date(2023, 1, 22, 11, 30),
    color: "red",
    title: "Meeting",
    description: "E2",
    resolveOverlap: "lane",
    stackKey: "",
    eventKind: "standard",
  },
];

function MyEventComponent({ event }: { event: WeekViewEvent }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.replace("/tripRoutePage?locationId=" + event.id)}
      paddingLeft={5}
      paddingTop={5}
      width={"100%"}
      flex={1}
    >
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "#333333" }}>
        {event.title}
      </Text>
      <Text style={{ fontSize: 10, color: "#333333" }}>
        {event.description}
      </Text>
    </Pressable>
  );
}

const MyTodayComponent = () => <Box></Box>;

export default function Calendar(props: { data: TripLocation[] }) {
  const events: WeekViewEvent[] = props.data.map((value, i) => {
    return {
      id: i,
      startDate: new Date(
        2023,
        1,
        22,
        +value.from_time.slice(0, 2),
        +value.from_time.slice(2, 4)
      ),
      endDate: new Date(
        2023,
        1,
        22,
        +value.to_time.slice(0, 2),
        +value.to_time.slice(2, 4)
      ),
      color: "#E5F9D3",
      title: value.location,
      description: "null",
      resolveOverlap: "lane",
      stackKey: "",
      eventKind: "standard",
    };
  });
  return (
    <NativeBaseProvider>
      <WeekView
        headerStyle={styles.header}
        headerTextStyle={styles.headerText}
        hourTextStyle={styles.hourText}
        eventContainerStyle={styles.eventContainer}
        gridColumnStyle={styles.gridColumn}
        gridRowStyle={styles.gridRow}
        hourContainerStyle={styles.hourContainer}
        events={events}
        EventComponent={MyEventComponent}
        selectedDate={new Date(2023, 1, 22)}
        numberOfDays={1}
        showTitle={false}
        timesColumnWidth={0.25}
        hoursInDisplay={8}
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#81c784",
    height: 0,
  },
  headerText: {
    color: "#333333",
    height: 0,
  },
  hourText: {
    color: "#333333",
    textAlign: "right",
    marginRight: 30,
  },
  hourContainer: {
    backgroundColor: "white",
  },
  eventContainer: {
    backgroundColor: "#E5F9D3",
  },
  gridRow: {
    borderTopWidth: 1,
    borderColor: "#dfdfdf",
  },
  gridColumn: {
    borderLeftWidth: 0,
  },
});
