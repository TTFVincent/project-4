import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
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
  Flex,
  Text,
  Slider,
  Pressable,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPalette,
  faMusic,
  faBaseball,
  faLandmark,
  faTree,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { usePromptStore } from "../../../zustand/usePromptStore";
import {
  color_box_BG,
  color_button_BG,
  color_header_backGround,
  color_icon_border,
  colour_container_bg,
  colour_input_text,
} from "../../../components/css/colors";
//@ts-ignore
import { GPT_server } from "@env";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";
import { TapGestureHandler } from "react-native-gesture-handler";
import { useChatGPTRespond } from "../../../zustand/useChatGPTRespondStore";
import Spinner from "react-native-loading-spinner-overlay";
import SegmentedControlTab from "react-native-segmented-control-tab";
import DatePicker from "react-native-date-picker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
type LocationTabs = {
  id: number;
  text: string;
};

type Input = {
  budget: string | undefined;
  travel_style: null | string;
  group_size: null | string;
  StartTime: null | string;
  EndTime: null | string;
  interestsNew: null | string;
  destination: null | string;
  cuisineType: null | string;
  activityType: null | string;
};

const dateTimePickerProps = {
  value: new Date(),
  mode: "time",
  // display: "inline",
};

function CreateInputTab() {
  const inputValue = useRef<LocationTabs[]>([]);
  const [changed, updateChanged] = useState<boolean>(false);
  const prompt = usePromptStore((state: any) => state.savePrompt);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [topOptionValues, setTopOptionValues] = useState<Input>({
    budget: undefined,
    travel_style: null,
    group_size: null,
    StartTime: null,
    EndTime: null,
    interestsNew: null,
    destination: null,
    cuisineType: null,
    activityType: null,
  });
  const saveRespond = useChatGPTRespond((state: any) => state.saveRespond);
  const router = useRouter();
  console.log("snd values: ", topOptionValues);

  const onSubmit = async () => {
    setLoadingScreen(true);
    const response = await fetch(`http://13.54.234.151/gpt/trip`, {
      method: "POST",
      body: JSON.stringify(topOptionValues),
      // body: JSON.stringify(topOptionValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resText = await response.text();

    try {
      const res = JSON.parse(resText);
      console.log("chatGPT respond: ", res);
      saveRespond(res);
      setLoadingScreen(false);
      router.push("/calendarPage");
    } catch {
      console.log("chatGPT respond text: ", resText);
      setLoadingScreen(false);
    }

    // const response = await axios.post(`http://13.54.234.151/gpt/trip`, {
    //   params: { input: JSON.stringify(topOptionValues) },
    // });
    // console.log(response.data);
    // prompt(response);
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
  const interestsNew = [
    { label: "Art", value: "Art" },
    { label: "Music", value: "Music" },
    { label: "Sport", value: "Sport" },
    { label: "Food", value: "Food" },
    { label: "Nature", value: "Nature" },
    { label: "History", value: "History" },
  ];

  const group_size = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  ];

  const destination = [
    { label: "HK", value: "Hong Kong" },
    { label: "New York", value: "New York" },
    { label: "Tokyo", value: "Tokyo" },
  ];

  const activityType = [
    { label: "Out door", value: "Out door" },
    { label: "Shopping", value: "Shopping" },
    { label: "NightLife", value: "NightLife" },
    { label: "Museums", value: "Museums" },
    { label: "Beach", value: "Beach" },
  ];

  const travelStyle = [
    { label: "Road trip", value: "Road trip" },
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
    StartTime.push({ label: `${h}am`, value: `${h}:00` });
    EndTime.push({ label: `${h}am`, value: `${h + 12}:00` });
  }
  for (let h = 1; h <= 12; h++) {
    StartTime.push({ label: `${h}pm`, value: `${h}:00` });
    EndTime.push({ label: `${h}pm`, value: `${h + 12}:00` });
  }

  function touchScreen() {
    Keyboard.dismiss();
  }

  function toTime() {
    let showTime = { startTime: "", endTime: "" };
    let startTime = topOptionValues.StartTime;
    let endTime = topOptionValues.EndTime;
    if (startTime) {
      showTime["startTime"] = startTime.toString().slice(0, -2);
    }
    if (endTime) {
      showTime["endTime"] = endTime.toString().slice(0, -2);
    }
    return showTime;
  }

  function checkBudgetInput(input: any) {
    console.log("leave focus: " + topOptionValues.budget);

    if (/^\d+$/.test(input)) {
      if (input >= 5000) {
        setTopOption("5000", "budget");
        setShowBudget("5000");
      }
      if (input <= 1000) {
        setTopOption("1000", "budget");
        setShowBudget("1000");
      }

      setTopOption(input, "budget");
    }
  }

  const [showBudget, setShowBudget] = useState<string>("");
  // useEffect(() => {
  //   setShowBudget(checkBudgetInput(topOptionValues.budget));
  // }, [topOptionValues.budget]);

  const [selectTab, setSelectTab] = useState(0);

  function handleIndexChange(value: number) {
    setSelectTab(value);
    setTopOption(String(value + 1), "group_size");
  }

  function handleInput(text: string) {
    if (/^\d+$/.test(text)) setShowBudget(text);
  }

  const [date, setDate] = useState(new Date());
  return (
    <TapGestureHandler onHandlerStateChange={touchScreen} numberOfTaps={1}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.view_bg}>
          <Spinner
            visible={loadingScreen}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
          <Box style={styles.topContainer}>
            <ScrollView>
              {/* ------------------------------ interestsNew tab ------------------------------  */}
              <Box marginTop="20px">
                <Flex flexDir={"row"} justifyContent={"space-around"}>
                  <Box>
                    <Button
                      style={
                        topOptionValues.interestsNew == "Art"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Art", "interestsNew")}
                    >
                      <FontAwesomeIcon
                        color="#195CB2"
                        size={25}
                        icon={faPalette}
                      />
                    </Button>
                    <Text textAlign={"center"}>Art</Text>
                  </Box>
                  <Box>
                    <Button
                      style={
                        topOptionValues.interestsNew == "Food"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Food", "interestsNew")}
                    >
                      <FontAwesomeIcon
                        color="#195CB2"
                        size={25}
                        icon={faUtensils}
                      />
                    </Button>
                    <Text textAlign={"center"}>Food</Text>
                  </Box>

                  <Box>
                    <Button
                      style={
                        topOptionValues.interestsNew == "Music"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Music", "interestsNew")}
                    >
                      <FontAwesomeIcon
                        color="#195CB2"
                        size={25}
                        icon={faMusic}
                      />
                    </Button>
                    <Text textAlign={"center"}>Music</Text>
                  </Box>
                  <Box>
                    <Button
                      style={
                        topOptionValues.interestsNew == "Sport"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Sport", "interestsNew")}
                    >
                      <FontAwesomeIcon
                        color="#195CB2"
                        size={25}
                        icon={faBaseball}
                      />
                    </Button>
                    <Text textAlign={"center"}>Sport</Text>
                  </Box>
                  <Box>
                    <Button
                      style={
                        topOptionValues.interestsNew == "History"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("History", "interestsNew")}
                    >
                      <FontAwesomeIcon
                        color="#195CB2"
                        size={25}
                        icon={faLandmark}
                      />
                    </Button>
                    <Text textAlign={"center"}>History</Text>
                  </Box>
                  <Box>
                    <Button
                      style={
                        topOptionValues.interestsNew == "Nature"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Nature", "interestsNew")}
                    >
                      <FontAwesomeIcon
                        color="#195CB2"
                        size={25}
                        icon={faTree}
                      />
                    </Button>
                    <Text textAlign={"center"}>Nature</Text>
                  </Box>
                </Flex>
              </Box>

              {/* ------------------------------ number of people tab ------------------------------  */}
              <Box marginTop="20px" marginX="20px">
                <Text style={styles.labelText}>Select number of people</Text>
                <SegmentedControlTab
                  values={["1", "2", "3", "4", "5"]}
                  selectedIndex={selectTab}
                  onTabPress={(e) => {
                    handleIndexChange(e);
                  }}
                />
              </Box>

              {/* ------------------------------ travel Style tab------------------------------ */}
              <Box px={"5%"} marginTop="20px" width={"100%"}>
                <Text style={styles.labelText}>Select your travel style</Text>
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

              {/* ------------------------------ travel Cuisine tab------------------------------ */}
              <Box px={"5%"} marginTop="20px" width={"100%"}>
                <Text style={styles.labelText}>Select your cuisine type</Text>
                <Dropdown
                  placeholderStyle={styles.dropdown_placeHolder}
                  placeholder={
                    topOptionValues.cuisineType
                      ? topOptionValues.cuisineType
                      : "Select Cuisine Type"
                  }
                  data={cuisineType}
                  onChange={(item) => {
                    setTopOption(item.value, "cuisineType");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={200}
                />
              </Box>

              {/* ------------------------------ travel Activity tab------------------------------ */}
              <Box px={"5%"} marginTop="20px" width={"100%"}>
                <Text style={styles.labelText}>Select your activity type</Text>
                <Dropdown
                  placeholderStyle={styles.dropdown_placeHolder}
                  placeholder={
                    topOptionValues.activityType
                      ? topOptionValues.activityType
                      : "Select Activity Type"
                  }
                  data={activityType}
                  onChange={(item) => {
                    setTopOption(item.value, "activityType");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={500}
                />
              </Box>

              {/* ------------------------------ Time Picker tab------------------------------ */}

              <Box px={"5%"} marginTop="20px" width={"100%"}>
                <Pressable
                  onPress={() =>
                    DateTimePickerAndroid.open(dateTimePickerProps)
                  }
                >
                  <Text style={styles.labelText}>
                    Select Starting time type
                  </Text>
                </Pressable>
                {/* <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="inline"
                /> */}
                {/* <DatePicker
                  mode="time"
                  onDateChange={(e) => {
                    setDate;
                  }}
                  date={date}
                /> */}
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
                        ? "Start Time " + toTime().startTime + "00"
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
                        ? "End Time " + toTime().endTime + "00"
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
              </Box>
              {/* ------------------------------- budget tab ------------------------------- */}
              <Box marginX="20px" marginTop="20px">
                <Text style={styles.labelText}>Input your budget</Text>

                <Input
                  fontSize={15}
                  value={showBudget}
                  onEndEditing={(e) => {
                    console.log(e.nativeEvent.text);
                    checkBudgetInput(e.nativeEvent.text);
                  }}
                  onChangeText={(e) => {
                    handleInput(e);
                  }}
                  placeholder={"Input your budget 1000 - 5000"}
                />
              </Box>

              {/* ------------------------------- Destination tab ------------------------------- */}
              <Box marginX="20px" marginTop="20px">
                <Text style={styles.labelText}>
                  Input the country and the city
                </Text>
                <Input
                  fontSize={15}
                  onEndEditing={(e) => {
                    setTopOption(e.nativeEvent.text, "destination");
                    console.log();
                  }}
                  placeholder={"Eg: Japan Tokyo"}
                />
              </Box>

              <Center>
                <Button
                  marginTop={"20px"}
                  style={styles.Button_planTrip}
                  onPress={async () => onSubmit()}
                  fontSize={"sm"}
                >
                  Plan Trip
                </Button>
              </Center>
            </ScrollView>
          </Box>
        </View>
      </SafeAreaView>
    </TapGestureHandler>
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
  interestNewButons: {
    borderRadius: 15,
    backgroundColor: "#eee",
    borderColor: color_icon_border,
    borderWidth: 1,
  },
  interestNewButonsSelected: {
    borderRadius: 15,
    backgroundColor: "#aaa",
    borderColor: color_icon_border,
    borderWidth: 1,
  },
  spinnerTextStyle: { color: "#FFF" },
  SafeAreaView: { backgroundColor: color_header_backGround },
  view_bg: {
    backgroundColor: colour_container_bg,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: "#fff",
    color: "#",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
    height: 40,
  },
  dropdown_placeHolder: {
    textAlign: "center",
  },
  topContainer: {
    height: "100%",
  },
  labelText: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  Button_planTrip: {
    height: 50,
    width: 200,
    borderRadius: 20,
  },
});
