import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import {
  Dimensions,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Button,
  TextArea,
  Divider,
} from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { TripLocation } from "../constants/TripLocation";

export default function BasicSwipeList(props: {
  data: TripLocation[];
  setData: Dispatch<SetStateAction<TripLocation[]>>;
}) {
  const closeRow = (rowMap: RowMap<TripLocation>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<TripLocation>, rowKey: string) => {
    console.log("Delete this row", rowKey);
    closeRow(rowMap, rowKey);
    props.setData(props.data.filter((item) => item.id !== rowKey));
  };

  const onRowDidOpen = (rowKey: string) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data: ListRenderItemInfo<TripLocation>) => (
    <Box>
      <Box pl="6" pr="5" py="2">
        <HStack alignItems="center" space={3}>
          <VStack>
            <Text
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              bold
            >
              {data.item.location}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {data.item.location_address}
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </Box>
    </Box>
  );

  const renderHiddenItem = (
    data: ListRenderItemInfo<TripLocation>,
    rowMap: RowMap<TripLocation>
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
  );
}
