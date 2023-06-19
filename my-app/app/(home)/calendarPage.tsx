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

export default function CalendarPage() {
  const [tripData, setTripData] = useState<TripLocation[]>(sampleTrip);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <VStack
          h="25%"
          flex={1}
          space={4}
          alignItems="center"
          style={styles.header}
        >
          <Box pt="2" pl="10" w="100%" h="30%" bg="white">
            <Text fontSize="24" color="#333333">
              14 February
            </Text>
          </Box>
          <HStack w="90%" h="20%" bg="white" justifyContent="space-between">
            <DatePickButton scale="Day" />
            <DatePickButton scale="Week" />
            <DatePickButton scale="Month" />
          </HStack>
          <Box h="5%"></Box>
          <Center w="100%" h="35%" bg="white">
            <HStack w="90%" justifyContent="space-between">
              <WeekDayButton weekDay="Mon" date="14" />
              <WeekDayButton weekDay="Tue" date="15" />
              <WeekDayButton weekDay="Wed" date="16" />
              <WeekDayButton weekDay="Thu" date="17" />
              <WeekDayButton weekDay="Fri" date="18" />
              <WeekDayButton weekDay="Sat" date="19" />
              <WeekDayButton weekDay="Sun" date="20" />
            </HStack>
          </Center>
        </VStack>
        <Box h="75%" style={styles.calendar}>
          <Calendar data={tripData} />
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

function DatePickButton(props: { scale: string }) {
  return (
    <Button p={0} w="30%" rounded="full" shadow={5} bg="white">
      <Text fontSize="14" color="#333333">
        {props.scale}
      </Text>
    </Button>
  );
}

function WeekDayButton(props: { weekDay: string; date: string }) {
  return (
    <Button
      p={0}
      w="12%"
      h="100%"
      rounded="full"
      shadow={5}
      bg="white"
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
