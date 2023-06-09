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
  Modal,
  KeyboardAvoidingView,
  ZStack,
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
  IconDefinition,
  faMapLocationDot,
  faPlaneDeparture,
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
import {
  UseChatGPTResponse,
  useChatGPTResponse,
} from "../../../zustand/useChatGPTResponseStore";
import Spinner from "react-native-loading-spinner-overlay";
import SegmentedControlTab from "react-native-segmented-control-tab";
import DatePicker from "react-native-date-picker";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTrip } from "../../../context/personalTripContext";
import MapPicker from "../../../components/MapPicker";
import { RobotoBoldText, RobotoText } from "../../../components/StyledText";
import {
  ButtonShadowProps,
  PrimaryButtonProps,
  SecondaryButtonProps,
  TernaryButtonProps,
} from "../../../constants/Button";

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
  interests_new: null | string[];
  destination: null | string;
  cuisine_type: null | string;
  // activity_type: null | string;
};

function CreateInputTab() {
  /* ------------------------------ tripsContext ------------------------------ */
  const tripsContext = useTrip();
  if (!tripsContext) {
    throw new Error("tripsContext not found");
  }
  /* ---------------------------- tripsContext end ---------------------------- */

  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [regionString, setRegionString] = useState<string>("");

  const [destinationBuffer, setDestinationBuffer] = useState<string>("");

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
    // activity_type: null,
  });
  const saveResponse = useChatGPTResponse(
    (state: UseChatGPTResponse) => state.saveResponse
  );
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
      console.log("chatGPT Response: ", res);
      saveResponse(res);
      setLoadingScreen(false);
      tripsContext.saveLocalTrip(res);
      router.push("/calendarPage");
    } catch {
      console.log("chatGPT Response text: ", resText);
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

  const travelStyle = [
    { label: "Luxury", value: "more luxury and better services" },
    { label: "Budget", value: "with in a Budget catagories" },
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

  function handleIndexChange(value: number) {
    setSelectTab(value);
    setTopOption(String(value + 1), "group_size");
  }

  function handleInput(text: string) {
    if (/^\d+$/.test(text)) setShowBudget(text);
  }

  function handleInterestButtons(value: string) {
    if (
      topOptionValues.interests_new &&
      !topOptionValues.interests_new.includes(value)
    ) {
      console.log("1");
      setTopOptionValues({
        ...topOptionValues,
        interests_new: [...topOptionValues.interests_new, value],
      });
    }

    if (topOptionValues.interests_new == null) {
      console.log("2");

      setTopOptionValues({
        ...topOptionValues,
        interests_new: [value],
      });
    }
    if (topOptionValues.interests_new?.includes(value)) {
      let array: string[] = [];
      console.log("3");
      topOptionValues.interests_new.map((e) => {
        if (value != e) {
          array.push(e);
        }
      });
      setTopOptionValues({
        ...topOptionValues,
        interests_new: [...array],
      });
    }
  }
  console.log(topOptionValues.interests_new);

  function ActivityButton(props: { activity: string; icon: IconDefinition }) {
    return (
      <Center w="15%">
        <Button
          w="90%"
          {...(topOptionValues.interests_new?.includes(props.activity)
            ? { ...TernaryButtonProps }
            : { ...SecondaryButtonProps })}
          onPress={() => handleInterestButtons(props.activity)}
        >
          <FontAwesomeIcon color="#030303" size={25} icon={props.icon} />
        </Button>
        <RobotoText fontSize="10" textAlign={"center"}>
          {props.activity}
        </RobotoText>
      </Center>
    );
  }
  //faPalette
  return (
    // <TapGestureHandler onHandlerStateChange={touchScreen} numberOfTaps={1}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.SafeAreaView}>
          <Center style={styles.view_bg}>
            <Spinner
              visible={loadingScreen}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
            <Box w="90%" style={styles.topContainer}>
              <ScrollView>
                <View onStartShouldSetResponder={() => true}>
                  {/* ------------------------------ interests_new tab ------------------------------  */}
                  <Box marginTop="20px">
                    <RobotoBoldText mb={2}>Activities Option</RobotoBoldText>

                    <HStack justifyContent={"space-around"}>
                      <ActivityButton activity="Art" icon={faPalette} />
                      <ActivityButton activity="Food" icon={faUtensils} />
                      <ActivityButton activity="Music" icon={faMusic} />
                      <ActivityButton activity="Sport" icon={faBaseball} />
                      <ActivityButton activity="History" icon={faLandmark} />
                      <ActivityButton activity="Nature" icon={faTree} />
                    </HStack>
                  </Box>

                  {/* ------------------------------ number of people tab ------------------------------  */}
                  <Box marginTop="20px">
                    <RobotoBoldText mb={2}>
                      Select number of people
                    </RobotoBoldText>
                    <SegmentedControlTab
                      borderRadius={0}
                      tabsContainerStyle={styles.tabsContainerStyle}
                      tabStyle={styles.tabStyle}
                      firstTabStyle={styles.firstTabStyle}
                      lastTabStyle={styles.lastTabStyle}
                      tabTextStyle={styles.tabTextStyle}
                      activeTabStyle={styles.activeTabStyle}
                      activeTabTextStyle={styles.activeTabTextStyle}
                      values={["1", "2", "3", "4", "5"]}
                      selectedIndex={selectTab}
                      onTabPress={(e) => {
                        handleIndexChange(e);
                      }}
                    />
                  </Box>

                  {/* ------------------------------ travel Style tab------------------------------ */}
                  <Box marginTop="20px" width={"100%"}>
                    <RobotoBoldText mb={2}>
                      Select your travel style
                    </RobotoBoldText>
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
                  <Box marginTop="20px" width={"100%"}>
                    <RobotoBoldText mb={2}>
                      Select your cuisine type
                    </RobotoBoldText>
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

                  {/* ------------------------------ travel Activity tab------------------------------
                <Box px={"5%"} marginTop="20px" width={"100%"}>
                  <Text style={styles.labelText}>
                    Select your activity type
                  </Text>
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
                </Box> */}

                  {/* ------------------------------ Time Picker tab------------------------------ */}

                  <Box
                    marginTop="20px"
                    width={"100%"}
                    display={"flex"}
                    flexDir={"row"}
                    justifyContent={"space-around"}
                  >
                    <Center>
                      <RobotoBoldText mb={2}>Starting time</RobotoBoldText>
                      {Platform.OS === "android" && (
                        <Pressable
                          onPress={() => {
                            //@ts-ignore
                            DateTimePickerAndroid.open(
                              startDateTimePickerProps
                            );
                          }}
                        >
                          <Box style={styles.timeButtons}>
                            <RobotoText
                              fontSize={"3xl"}
                              style={styles.timeTextDisplay}
                            >
                              {topOptionValues.start_time
                                ? topOptionValues.start_time
                                : "00:00"}
                            </RobotoText>
                          </Box>
                        </Pressable>
                      )}
                      {Platform.OS === "ios" && (
                        <DateTimePicker {...startDateTimePickerProps} />
                      )}
                    </Center>
                    <Center>
                      <RobotoBoldText mb={2}>Ending time</RobotoBoldText>
                      {Platform.OS === "android" && (
                        <Pressable
                          onPress={() => {
                            //@ts-ignore
                            DateTimePickerAndroid.open(endDateTimePickerProps);
                          }}
                        >
                          <Box style={styles.timeButtons}>
                            <Text
                              fontSize={"3xl"}
                              style={styles.timeTextDisplay}
                            >
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
                  <Box marginTop="20px">
                    <RobotoBoldText mb={2}>Input your budget</RobotoBoldText>

                    <Input
                      fontSize={12}
                      fontFamily="RobotoMono"
                      borderRadius={0}
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
                  <Box marginTop="20px">
                    <RobotoBoldText mb={2}>
                      Input the country and the city
                    </RobotoBoldText>
                    <Input
                      fontSize={12}
                      fontFamily="RobotoMono"
                      borderRadius={0}
                      onEndEditing={(e) => {
                        setTopOption(e.nativeEvent.text, "destination");
                      }}
                      onChangeText={(e) => {
                        setDestinationBuffer(e);
                      }}
                      placeholder={"Eg: Japan Tokyo"}
                      value={destinationBuffer}
                      InputRightElement={
                        <Pressable mr={3} onPress={() => setModalVisible(true)}>
                          <FontAwesomeIcon
                            color="#030303"
                            size={25}
                            icon={faMapLocationDot}
                          />
                        </Pressable>
                      }
                    />
                  </Box>
                  <Center m={10}>
                    <ZStack w="80%" h="12" reversed>
                      <Button
                        p={0}
                        w="100%"
                        h="95%"
                        {...PrimaryButtonProps}
                        onPress={async () => onSubmit()}
                      >
                        <RobotoBoldText fontSize={20}>
                          {"EUREKA! "}
                          <FontAwesomeIcon
                            color="#030303"
                            size={25}
                            icon={faPlaneDeparture}
                          />
                        </RobotoBoldText>
                      </Button>
                      <Box {...ButtonShadowProps} w="100%" h="95%" />
                    </ZStack>
                  </Center>
                </View>
              </ScrollView>
            </Box>
          </Center>
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            size={"xl"}
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>
                <Box h={300} justifyContent="center" alignItems="center">
                  <MapPicker
                    defaultLocation={{ latitude: 22.3, longitude: 114.17 }}
                    setRegionString={setRegionString}
                  />
                </Box>
              </Modal.Header>
              <Modal.Body>{regionString}</Modal.Body>
              <Modal.Footer justifyContent={"center"}>
                <Button
                  onPress={() => {
                    setTopOption(regionString, "destination");
                    setDestinationBuffer(regionString);
                    setModalVisible(false);
                  }}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // </TapGestureHandler>
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
  timeTextDisplay: {
    fontFamily: "RobotoMono",
  },
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
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#030303",
  },
  dropdown_placeHolder: {
    fontSize: 12,
    fontFamily: "RobotoMono",
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
  tabsContainerStyle: {
    borderColor: "#030303",
    //custom styles
  },
  tabStyle: {
    borderColor: "#030303",
    backgroundColor: "#ffffff",
    //custom styles
  },
  firstTabStyle: {
    //custom styles
  },
  lastTabStyle: {
    //custom styles
  },
  tabTextStyle: {
    fontFamily: "RobotoMono",
    color: "#030303",
    //custom styles
  },
  activeTabStyle: {
    borderColor: "#030303",
    backgroundColor: "#e6e6e6",
    //custom styles
  },
  activeTabTextStyle: {
    fontFamily: "RobotoMono",
    color: "#030303",
    //custom styles
  },
  tabBadgeContainerStyle: {
    //custom styles
  },
  activeTabBadgeContainerStyle: {
    //custom styles
  },
  tabBadgeStyle: {
    //custom styles
  },
  activeTabBadgeStyle: {
    //custom styles
  },
});
