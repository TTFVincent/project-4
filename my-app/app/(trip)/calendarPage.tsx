import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import Calendar from "../../components/Calendar";

import {
  Text,
  Box,
  Center,
  NativeBaseProvider,
  VStack,
  HStack,
  Button,
} from "native-base";
import { TripLocation, sampleTrip } from "../../constants/TripLocation";
import { useChatGPTRespond } from "../../zustand/useChatGPTRespondStore";

export default function CalendarPage() {
  const respond = useChatGPTRespond((state: any) => state.respond);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const todayWeekStartDate = today.getDate() - today.getDay();
  const [tripData, setTripData] = useState<TripLocation[]>(respond);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <VStack
          h="15%"
          flex={1}
          space={4}
          alignItems="center"
          style={styles.header}
        >
          <Box pt="2" pl="10" w="100%" h="50%" bg="white">
            <Text fontSize="24" color="#333333">
              {`${monthNames[today.getMonth()]} ${today.getDate()}`}
            </Text>
          </Box>
          {/* <HStack w="90%" h="20%" bg="white" justifyContent="space-between">
            <DatePickButton scale="Day" />
            <DatePickButton scale="Week" />
            <DatePickButton scale="Month" />
          </HStack> */}
          <Center w="100%" h="50%" bg="white">
            <HStack w="90%" justifyContent="space-between">
              {weekDayNames.map((weekDay, i) => {
                const date = todayWeekStartDate + i;
                return (
                  <WeekDayButton
                    weekDay={weekDay}
                    date={`${date}`}
                    active={date === today.getDate()}
                  />
                );
              })}
            </HStack>
          </Center>
        </VStack>
        <Box h="85%" style={styles.calendar}>
          <Calendar data={tripData} />
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

function DatePickButton(props: { scale: string }) {
  return (
    <Button p={0} w="30%" shadow={5} bg="#EBEDF1">
      <Text fontSize="14" color="#333333">
        {props.scale}
      </Text>
    </Button>
  );
}

function WeekDayButton(props: {
  weekDay: string;
  date: string;
  active: boolean;
}) {
  return (
    <Button
      p={0}
      w="12%"
      h="100%"
      shadow={props.active ? 0 : 3}
      bg={props.active ? "#92F938" : "#EBEDF1"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Text fontSize="12" color="#333333" textAlign={"center"}>
        {props.weekDay}
      </Text>
      <Text fontSize="14" color="#333333" textAlign={"center"}>
        {props.date}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    elevation: 1,
    zIndex: 1,
  },
  calendar: {
    elevation: 0,
    zIndex: 0,
  },
});
