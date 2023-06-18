import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { StyleSheet, SafeAreaView } from "react-native";
import WeekView from "react-native-week-view";

const myEvents = [
  {
    id: 1,
    startDate: new Date(2023, 1, 20, 9),
    endDate: new Date(2023, 1, 20, 11),
    color: "blue",
    title: "Meeting",
    description: "E1",
    // ... more properties if needed,
  },
  {
    id: 2,
    startDate: new Date(2023, 1, 22, 10),
    endDate: new Date(2023, 1, 22, 11, 30),
    color: "red",
    title: "Meeting",
    description: "E2",
  },
  // More events...
];
const MyEventComponent = ({ event }) => (
  <>
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{event.title}</Text>
    <Text style={{ fontSize: 16, alignSelf: "flex-start" }}>
      {event.description}
    </Text>
  </>
);

export default function calendar() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <WeekView
          headerStyle={styles.header}
          headerTextStyle={styles.headerText}
          hourTextStyle={styles.hourText}
          eventContainerStyle={styles.eventContainer}
          gridColumnStyle={styles.gridColumn}
          gridRowStyle={styles.gridRow}
          hourContainerStyle={styles.hourContainer}
          events={myEvents}
          EventComponent={MyEventComponent}
          selectedDate={new Date(2023, 1, 20, 12)}
          numberOfDays={1}
          pageStartAt={{ weekday: 1 }}
        />
      </SafeAreaView>
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
    borderColor: "black",
  },
  headerText: {
    color: "black",
  },
  hourText: {
    color: "black",
  },
  hourContainer: {
    backgroundColor: "#81c784",
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
  },
  gridRow: {
    borderTopWidth: 1,
    borderColor: "#dfdfdf",
  },
  gridColumn: {
    borderLeftWidth: 1,
    borderColor: "#dfdfdf",
  },
});
