import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { ListRenderItemInfo } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Icon,
  HStack,
  VStack,
  Spacer,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Trip } from "../constants/TripLocation";
import {
  UseChatGPTResponse,
  useChatGPTResponse,
} from "../zustand/useChatGPTResponseStore";
import { useRouter } from "expo-router";
import { RobotoBoldText, RobotoText } from "./StyledText";

export default function BasicSwipeList(props: {
  data: Trip[];
  setData: Dispatch<SetStateAction<Trip[]>>;
}) {
  const saveResponse = useChatGPTResponse(
    (state: UseChatGPTResponse) => state.saveResponse
  );
  const response = useChatGPTResponse(
    (state: UseChatGPTResponse) => state.response
  );
  const router = useRouter();

  const closeRow = (rowMap: RowMap<Trip>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<Trip>, rowKey: string) => {
    console.log("Delete this row", rowKey);
    closeRow(rowMap, rowKey);
    props.setData(props.data.filter((item) => item.id !== rowKey));
  };

  const onRowDidOpen = (rowKey: string) => {
    console.log("This row opened", rowKey);
  };

  function onPressRow(trip: Trip) {
    saveResponse(trip.trip);
    router.push("/calendarPage");
  }

  const renderItem = (data: ListRenderItemInfo<Trip>) => (
    <Pressable
      bgColor="#FFFFFF"
      pl="6"
      pr="5"
      py="3"
      onPress={() => onPressRow(data.item)}
    >
      <HStack
        borderWidth={1}
        borderColor="#282828"
        bgColor="#E6E6E6"
        alignItems="center"
        justifyContent="space-between"
        space={3}
      >
        <VStack h={60}>
          <Box ml={3} my="auto">
            <RobotoBoldText>Trip #{data.item.id}</RobotoBoldText>
          </Box>
        </VStack>
        <VStack h={60}>
          <Box mr={5} my="auto">
            <FontAwesome size={28} name="angle-right" />
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  );

  const renderHiddenItem = (
    data: ListRenderItemInfo<Trip>,
    rowMap: RowMap<Trip>
  ) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text
            fontFamily="RobotoMono"
            color="white"
            fontSize="xs"
            fontWeight="medium"
          >
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <NativeBaseProvider>
      <Box bg="white" safeArea flex="1">
        <SwipeListView
          data={props.data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe={true}
          rightOpenValue={-130}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      </Box>
    </NativeBaseProvider>
  );
}
