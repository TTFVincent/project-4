import {
  Keyboard,
  Platform,
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
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTrip } from "../../../context/personalTripContext";
type LocationTabs = {
  id: number;
  text: string;
};

type Input = {
  budget: string | undefined;
  travel_style: null | string;
  group_size: null | string;
  start_time: null | string;
  end_time: null | string;
  interests_new: null | string;
  destination: null | string;
  cuisine_type: null | string;
  activity_type: null | string;
};

function CreateInputTab() {
  /* ------------------------------ tripsContext ------------------------------ */
  const tripsContext = useTrip();
  if (!tripsContext) {
    throw new Error("tripsContext not found");
  }
  /* ---------------------------- tripsContext end ---------------------------- */

  const [showBudget, setShowBudget] = useState<string>("");
  const [selectTab, setSelectTab] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [topOptionValues, setTopOptionValues] = useState<Input>({
    budget: undefined,
    travel_style: null,
    group_size: null,
    start_time: null,
    end_time: null,
    interests_new: null,
    destination: null,
    cuisine_type: null,
    activity_type: null,
  });
  const saveRespond = useChatGPTRespond((state: any) => state.saveRespond);
  const router = useRouter();
  const [formStartTime, setFormStartTime] = useState<Date>(new Date());
  const [formEndTime, setFormEndTime] = useState<Date>(new Date());

  function setStartTime(event: DateTimePickerEvent, date?: Date) {
    if (date) {
      setFormStartTime(date);
      setTopOption(date.toTimeString().slice(0, 5), "start_time");
    }
  }

  function setEndTime(event: DateTimePickerEvent, date?: Date) {
    if (date) {
      setFormEndTime(date);
      setTopOption(date.toTimeString().slice(0, 5), "end_time");
    }
  }

  const startDateTimePickerProps = {
    value: formStartTime,
    onChange: setStartTime,
    mode: "time",
    // display: "inline",
  };

  const endDateTimePickerProps = {
    value: formEndTime,
    onChange: setEndTime,
    mode: "time",
    // display: "inline",
  };

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
      tripsContext.saveLocalTrip(res);
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

  function setTopOption(value: string, key: string) {
    setTopOptionValues({
      ...topOptionValues,
      [`${key}`]: value,
    });
  }

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
  const cuisine_type = [
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
    let showTime = { start_time: "", end_time: "" };
    let startTime = topOptionValues.start_time;
    let endTime = topOptionValues.end_time;
    if (startTime) {
      showTime["start_time"] = startTime.toString().slice(0, -2);
    }
    if (endTime) {
      showTime["end_time"] = endTime.toString().slice(0, -2);
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

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  function handleIndexChange(value: number) {
    setSelectTab(value);
    setTopOption(String(value + 1), "group_size");
  }

  function handleInput(text: string) {
    if (/^\d+$/.test(text)) setShowBudget(text);
  }

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
              {/* ------------------------------ interests_new tab ------------------------------  */}
              <Box marginTop="20px">
                <Flex flexDir={"row"} justifyContent={"space-around"}>
                  <Box>
                    <Button
                      style={
                        topOptionValues.interests_new == "Art"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Art", "interests_new")}
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
                        topOptionValues.interests_new == "Food"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Food", "interests_new")}
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
                        topOptionValues.interests_new == "Music"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Music", "interests_new")}
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
                        topOptionValues.interests_new == "Sport"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Sport", "interests_new")}
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
                        topOptionValues.interests_new == "History"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("History", "interests_new")}
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
                        topOptionValues.interests_new == "Nature"
                          ? styles.interestNewButonsSelected
                          : styles.interestNewButons
                      }
                      onPress={() => setTopOption("Nature", "interests_new")}
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
                    topOptionValues.cuisine_type
                      ? topOptionValues.cuisine_type
                      : "Select Cuisine Type"
                  }
                  data={cuisine_type}
                  onChange={(item) => {
                    setTopOption(item.value, "cuisine_type");
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
                    topOptionValues.activity_type
                      ? topOptionValues.activity_type
                      : "Select Activity Type"
                  }
                  data={activityType}
                  onChange={(item) => {
                    setTopOption(item.value, "activity_type");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={500}
                />
              </Box>

              {/* ------------------------------ Time Picker tab------------------------------ */}

              <Box
                px={"5%"}
                marginTop="20px"
                width={"100%"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-around"}
              >
                <Center>
                  <Text style={styles.labelText}>Starting time type</Text>
                  {Platform.OS === "android" && (
                    <Pressable
                      onPress={() => {
                        //@ts-ignore
                        DateTimePickerAndroid.open(startDateTimePickerProps);
                      }}
                    >
                      <Box style={styles.timeButtons}>
                        <Text fontSize={"3xl"} style={styles.timeTextDisplay}>
                          {topOptionValues.start_time
                            ? topOptionValues.start_time
                            : "00:00"}
                        </Text>
                      </Box>
                    </Pressable>
                  )}
                  {Platform.OS === "ios" && (
                    <DateTimePicker {...startDateTimePickerProps} />
                  )}
                </Center>
                <Center>
                  <Text style={styles.labelText}> Ending time type</Text>
                  {Platform.OS === "android" && (
                    <Pressable
                      onPress={() => {
                        //@ts-ignore
                        DateTimePickerAndroid.open(endDateTimePickerProps);
                      }}
                    >
                      <Box style={styles.timeButtons}>
                        <Text fontSize={"3xl"} style={styles.timeTextDisplay}>
                          {topOptionValues.end_time
                            ? topOptionValues.end_time
                            : "00:00"}
                        </Text>
                      </Box>
                    </Pressable>
                  )}
                  {Platform.OS === "ios" && (
                    <DateTimePicker {...endDateTimePickerProps} />
                  )}
                </Center>
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
  timeTextDisplay: {},
  timeButtons: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
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
