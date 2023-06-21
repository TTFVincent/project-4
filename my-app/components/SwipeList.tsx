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
import { MaterialIcons } from "@expo/vector-icons";
import { Trip } from "../constants/TripLocation";

export default function BasicSwipeList(props: {
  data: Trip[];
  setData: Dispatch<SetStateAction<Trip[]>>;
}) {
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

  const renderItem = (data: ListRenderItemInfo<Trip>) => (
    <Box pl="6" pr="5" py="2" bgColor="white">
      <HStack alignItems="center" space={3}>
        <VStack>
          <Text
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            bold
          >
            Trip
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {data.item.id}
          </Text>
        </VStack>
        <Spacer />
      </HStack>
    </Box>
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
          <Text color="white" fontSize="xs" fontWeight="medium">
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
