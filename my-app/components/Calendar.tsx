import React from "react";
import { Box, NativeBaseProvider, Pressable, Text } from "native-base";
import { StyleSheet, SafeAreaView } from "react-native";
import WeekView, { WeekViewEvent } from "react-native-week-view";
import { TripLocation } from "../constants/TripLocation";
import { useRouter } from "expo-router";
import { RobotoBoldText, RobotoText } from "./StyledText";

function MyEventComponent({ event }: { event: WeekViewEvent }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/tripRoutePage?locationId=" + event.id)}
      paddingLeft={5}
      paddingRight={5}
      paddingTop={5}
      width={"100%"}
      flex={1}
    >
      <Box>
        <RobotoBoldText
          style={{ fontSize: 12, fontWeight: "bold", color: "#333333" }}
        >
          {event.title}
        </RobotoBoldText>
        <RobotoText style={{ fontSize: 10, color: "#333333" }}>
          {event.description}
        </RobotoText>
      </Box>
    </Pressable>
  );
}

export default function Calendar(props: { data: TripLocation[] }) {
  const events: WeekViewEvent[] = props.data.map((value, i) => {
    return {
      id: i,
      startDate: new Date(
        2023,
        1,
        22,
        value.from_time.length === 5
          ? +value.from_time.slice(0, 2)
          : +value.from_time.slice(0, 1),
        value.from_time.length === 5
          ? +value.from_time.slice(3, 5)
          : +value.from_time.slice(2, 4)
      ),
      endDate: new Date(
        2023,
        1,
        22,
        value.to_time.length === 5
          ? +value.to_time.slice(0, 2)
          : +value.to_time.slice(0, 1),
        value.to_time.length === 5
          ? +value.to_time.slice(3, 5)
          : +value.to_time.slice(2, 4)
      ),
      color: "#E5F9D3",
      title: value.location,
      description: value.location_address,
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
        // hourContainerStyle={styles.hourContainer} // TODO check if it exist
        events={events}
        EventComponent={MyEventComponent}
        selectedDate={new Date(2023, 1, 22)}
        numberOfDays={1}
        showTitle={false}
        timesColumnWidth={0.25}
        hoursInDisplay={8}
        fixedHorizontally={true}
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
    fontFamily: "RobotoMono",
    color: "#333333",
    height: 0,
  },
  hourText: {
    fontFamily: "RobotoMono",
    color: "#333333",
    textAlign: "right",
    marginRight: 30,
  },
  hourContainer: {
    backgroundColor: "white",
  },
  eventContainer: {
    borderRadius: 10,
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
