import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import {
  Box,
  Center,
  FormControl,
  ScrollView,
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Stack,
} from "native-base";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { usePromptStore } from "../../../zustand/usePromptStore";
import {
  color_box_BG,
  color_button_BG,
  color_header_backGround,
  colour_constainer_bg,
} from "../../../components/css/colors";
//@ts-ignore
import { GPT_server } from "@env";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";

type LocationTabs = {
  id: number;
  text: string;
};

function CreateInputTab() {
  const inputValue = useRef<LocationTabs[]>([]);
  const [changed, updateChanged] = useState<boolean>(false);
  const prompt = usePromptStore((state: any) => state.savePrompt);
  const [selected, setSelected] = useState("");
  const [topOptionValues, setTopOptionValues] = useState({
    budget: null,
    travel_style: null,
    group_size: null,
    StartTime: null,
    EndTime: null,
  });

  console.log("snd values: ", topOptionValues);
  const onSubmit = async () => {
    console.log("snd values: ", GPT_server);
    const response = fetch(`https://www.yahoo.com`);
    // const response = await axios.get(`http://localhost:3000/123`);
    console.log(response);
    prompt(response);
  };

  const addInput = () => {
    if (inputValue.current.length >= 3) {
      return;
    }
    let id: number = inputValue.current[0]
      ? inputValue.current[inputValue.current.length - 1].id + 1
      : 0;

    inputValue.current = [...inputValue.current, { id, text: "" }];
    updateChanged(!changed);
    console.log(inputValue.current);
  };

  const deleteInput = (id: number) => {
    const updatedList = inputValue.current.filter((listItem) => {
      return listItem.id !== id;
    });
    inputValue.current = updatedList;
    updateChanged(!changed);
  };

  const inputText = (event: any, id: number) => {
    const value = event;
    const newInput = { id: id, text: value };
    const updatedList = inputValue.current.map((listItem) => {
      return listItem.id === id ? newInput : listItem;
    });
    inputValue.current = updatedList;
  };

  function setTopOption(value: string, key: string) {
    setTopOptionValues({
      ...topOptionValues,
      [`${key}`]: value,
    });
  }

  const budget = [
    { label: "100 ~ 500", value: "500" },
    { label: "500 ~ 1000", value: "1000" },
    { label: "1000 ~ 2000", value: "2000" },
    { label: "2000 ~ 5000", value: "5000" },
    { label: "5000 ~ 10000", value: "10000" },
    { label: "10000+", value: "10000 plus" },
  ];

  const groupSize = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  ];

  const travelStyle = [
    { label: "Road trip", value: "Road trip" },
    { label: "Cultural", value: "Cultural travel" },
    { label: "Food trip", value: "Food travel" },
    { label: "Luxury", value: "Luxury travel" },
    { label: "Budget", value: "Budget travel" },
  ];
  const cuisineType = [
    { label: "Italian cuisine", value: "Italian cuisine" },
    { label: "Chinese cuisine", value: "Chinese cuisine" },
    { label: "Mexican cuisine", value: "Mexican cuisine" },
    { label: "French cuisine", value: "French cuisine" },
    { label: "Indian cuisine", value: "5Indian cuisine" },
    { label: "Japanese cuisine", value: "Japanese cuisine" },
    { label: "Korean cuisine", value: "Korean cuisine" },
  ];

  const StartTime = [];
  const EndTime = [];
  for (let h = 1; h <= 12; h++) {
    StartTime.push({ label: `${h}am`, value: `${h}am` });
    EndTime.push({ label: `${h}am`, value: `${h}am` });
  }
  for (let h = 1; h <= 12; h++) {
    StartTime.push({ label: `${h}pm`, value: `${h}pm` });
    EndTime.push({ label: `${h}pm`, value: `${h}pm` });
  }

  function touchScreen() {
    Keyboard.dismiss();
    console.log("here");
  }

  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={() => touchScreen()}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.view_bg}>
          <Box style={styles.topContainer}>
            <Box
              px={"5%"}
              width={"100%"}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginY="20px"
            >
              <Box width={"47.5%"}>
                <Dropdown
                  placeholder={
                    topOptionValues.budget
                      ? "Budget: " + topOptionValues.budget
                      : "Select Budget"
                  }
                  placeholderStyle={styles.dropdown_placeHolder}
                  data={budget}
                  onChange={(item) => {
                    setTopOption(item.value, "budget");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={200}
                />
              </Box>
              <Box width={"47.5%"}>
                <Dropdown
                  placeholder={
                    topOptionValues.travel_style
                      ? topOptionValues.travel_style
                      : "Select Travel Style"
                  }
                  placeholderStyle={styles.dropdown_placeHolder}
                  data={travelStyle}
                  onChange={(item) => {
                    setTopOption(item.value, "travel_style");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                />
              </Box>
            </Box>

            <Box
              px={"5%"}
              width={"100%"}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box width={"47.5%"}>
                <Dropdown
                  placeholderStyle={styles.dropdown_placeHolder}
                  placeholder={
                    topOptionValues.StartTime
                      ? "Start Time " + topOptionValues.StartTime
                      : "Select Start Time"
                  }
                  data={StartTime}
                  onChange={(item) => {
                    setTopOption(item.value, "StartTime");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={200}
                />
              </Box>
              <Box width={"47.5%"}>
                <Dropdown
                  placeholderStyle={styles.dropdown_placeHolder}
                  placeholder={
                    topOptionValues.group_size
                      ? "Group Size: " + topOptionValues.group_size
                      : "Select Group Size"
                  }
                  data={groupSize}
                  onChange={(item) => {
                    setTopOption(item.value, "group_size");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={200}
                />
              </Box>
            </Box>

            <Box
              px={"5%"}
              width={"100%"}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box width={"47.5%"}>
                <Dropdown
                  placeholderStyle={styles.dropdown_placeHolder}
                  placeholder={
                    topOptionValues.EndTime
                      ? "End Time " + topOptionValues.EndTime
                      : "Select End Time"
                  }
                  data={EndTime}
                  onChange={(item) => {
                    setTopOption(item.value, "EndTime");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={200}
                />
              </Box>
              <Box width={"47.5%"}></Box>
            </Box>

            <Center>
              <Text>Add number of locations</Text>
              <Button
                style={styles.addInputButton}
                onPress={addInput}
                textAlign={"center"}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  size={40}
                  style={{ color: "#FFF" }}
                />
              </Button>
            </Center>
          </Box>

          <ScrollView h="80">
            <Stack
              pt="5"
              space={3}
              alignItems="center"
              // style={styles.secondContainer}
            >
              {inputValue.current.map((locationTabs: LocationTabs, i) => (
                <Box
                  key={String(locationTabs.id)}
                  width={"90%"}
                  padding={"2%"}
                  bg={color_box_BG}
                >
                  <Box>
                    <Button
                      style={styles.deleteButton}
                      roundedRight="md"
                      onPress={() => deleteInput(locationTabs.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} size={20} />
                    </Button>
                  </Box>
                  <Text>Destination {i + 1}</Text>
                  <HStack width="80%" pl="5%" space={1} alignItems="center">
                    <Box width={"50%"}>
                      <FormControl>
                        <Input
                          width="50%"
                          type="text"
                          placeholder="destination"
                          isFullWidth={true}
                          onChangeText={(event) => {
                            inputText(event, locationTabs.id);
                          }}
                        />
                      </FormControl>
                    </Box>
                  </HStack>

                  <HStack width="80%" pl="5%" space={1} alignItems="center">
                    <Box width={"47.5%"}>
                      <Dropdown
                        placeholderStyle={styles.dropdown_placeHolder}
                        placeholder={
                          topOptionValues.EndTime
                            ? "End Time " + topOptionValues.EndTime
                            : "Select End Time"
                        }
                        data={cuisineType}
                        onChange={(item) => {
                          setTopOption(item.value, "EndTime");
                        }}
                        labelField="label"
                        valueField="value"
                        style={styles.dropdown}
                        maxHeight={200}
                      />
                    </Box>
                  </HStack>
                </Box>
              ))}
            </Stack>
          </ScrollView>

          <HStack
            space="2"
            alignItems="center"
            justifyContent={"center"}
            style={styles.thirdContainer}
          >
            <Center>
              <Button size="16" onPress={async () => onSubmit()}>
                Plan Trip
              </Button>
            </Center>
          </HStack>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default function PlanTrip() {
  return (
    <NativeBaseProvider>
      <CreateInputTab />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: { backgroundColor: color_header_backGround },
  view_bg: {
    backgroundColor: colour_constainer_bg,
  },
  addInputButton: {
    backgroundColor: color_button_BG,
    color: color_button_BG,
    bottom: 5,
  },
  deleteButton: {
    backgroundColor: "#fff",
    color: "#",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdown_placeHolder: {
    textAlign: "center",
  },
  topContainer: {
    height: "32%",
    borderBottomColor: "#000",
    borderWidth: 2,
  },
  secondContainer: {
    height: 40,
    overflowY: "scroll",
    backgroundColor: colour_constainer_bg,
  },
  thirdContainer: {
    height: "15%",
    backgroundColor: colour_constainer_bg,
  },
});
