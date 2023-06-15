import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollViewBase,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View as NativeView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Box,
  Center,
  CheckIcon,
  Flex,
  FormControl,
  Icon,
  ScrollView,
  Select,
  VStack,
} from "native-base";
import { Text, View } from "../../../components/Themed";
import {
  Button,
  HStack,
  Heading,
  Input,
  NativeBaseProvider,
  Stack,
} from "native-base";
import React, { useRef, useState, useEffect, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { usePromptStore } from "../../../zustand/usePromptStore";
import {
  color_box_BG,
  color_header_backGround,
  colour_constainer_bg,
} from "../../../components/css/colors";
import { SERVER_ADDRESS } from "@env";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route } from "expo-router/build/Route";
import { useRouter } from "expo-router";

type Input = {
  id: number;
  text: string;
};

function useValue<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  return {
    get value() {
      return value;
    },
    set value(value: T) {
      setValue(value);
    },
    toString() {
      return String(value);
    },
  };
}

type Value<T> = {
  value: T;
};

type Dropdown2State<T> = {
  isOpen: Value<boolean>;
  x: Value<number>;
  y: Value<number>;
  selected: Value<T>;
  options: {
    text: string;
    value: T;
  }[];
};

function useDropdown2<T>(options: {
  options: {
    text: string;
    value: T;
  }[];
  defaultValue: T;
}) {
  const isOpen = useValue(false);
  const x = useValue(0);
  const y = useValue(0);
  const selected = useValue(options.defaultValue);
  function renderOptions() {
    return (
      <>
        {isOpen.value ? (
          <ScrollView
            style={{
              maxHeight: 200,
              position: "absolute",
              top: y.value,
              left: x.value,
              backgroundColor: "white",
              width: 150,
              padding: 16,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 16,
            }}
          >
            {options.options.map((option) => (
              <TouchableOpacity
                key={option.text}
                onPress={() => {
                  isOpen.value = false;
                  selected.value = option.value;
                }}
              >
                <Text> {option.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : null}
      </>
    );
  }
  return { isOpen, x, y, renderOptions, ...options, selected };
}

function Dropdown2<T>(props: { state: Dropdown2State<T> }) {
  const { state } = props;
  const { isOpen, x, y, options, selected } = state;
  const selectedOption = options.find(
    (option) => option.value === selected.value
  );
  return (
    <>
      <TouchableWithoutFeedback
        onPress={(e) => {
          isOpen.value = !isOpen.value;
          //   x.value = e.nativeEvent.pageX - e.nativeEvent.locationX;
          //   y.value = e.nativeEvent.pageY - e.nativeEvent.locationY;
          console.log({
            page: [e.nativeEvent.pageX, e.nativeEvent.pageY],
            location: [e.nativeEvent.locationX, e.nativeEvent.locationY],
            source: e.nativeEvent.target,
          });
        }}
      >
        <NativeView
          ref={(e) => {
            e?.measure((x, y, w, h, pageX, pageY) => {
              if (pageX) {
                state.x.value = pageX;
              }
              if (pageY) {
                state.y.value = pageY + h;
              }
            });
          }}
          style={{
            backgroundColor: "white",
            width: 150,
            padding: 16,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 16,
          }}
        >
          <Text>{selectedOption ? selectedOption.text : "Select One"}</Text>
        </NativeView>
      </TouchableWithoutFeedback>
    </>
  );
}

function CreateInputTab() {
  const inputValue = useRef<Input[]>([]);
  const [changed, updateChanged] = useState<boolean>(false);
  const prompt = usePromptStore((state: any) => state.savePrompt);
  const [selected, setSelected] = useState("");
  const [topOptionValues, setTopOptionValues] = useState({
    budget: "",
    groupSize: "",
  });

  console.log(topOptionValues);

  const onSubmit = async (inputValue: Input[]) => {
    const response = await fetch(`${SERVER_ADDRESS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    });
    const result = await response.json();
    console.log(result.message);
    prompt(result.message);
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

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

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

  function touchScreen() {
    Keyboard.dismiss();
    console.log("here");
  }

  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={() => touchScreen()}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.view_bg}>
          <Box style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                router.push("/profile");
              }}
            >
              <Box style={styles.profileIcon}>
                <FontAwesomeIcon icon={faUser} size={30} />
              </Box>
            </TouchableOpacity>
          </Box>
          <Box height={"40%"} borderBottomColor={"#000"} borderWidth={2}>
            <Box
              px={"5%"}
              width={"100%"}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box width={"47.5%"}>
                <Dropdown
                  placeholder={
                    topOptionValues.budget
                      ? "Budget: " + topOptionValues.budget
                      : "Select Budget"
                  }
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
                    topOptionValues.budget
                      ? "Budget: " + topOptionValues.budget
                      : "Select Budget"
                  }
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
                  placeholder={
                    topOptionValues.groupSize
                      ? topOptionValues.groupSize
                      : "Select Group Size"
                  }
                  data={groupSize}
                  onChange={(item) => {
                    setTopOption(item.value, "groupSize");
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
                    topOptionValues.groupSize
                      ? topOptionValues.groupSize
                      : "Select Group Size"
                  }
                  data={groupSize}
                  onChange={(item) => {
                    setTopOption(item.value, "groupSize");
                  }}
                  labelField="label"
                  valueField="value"
                  style={styles.dropdown}
                  maxHeight={200}
                />
              </Box>
            </Box>
          </Box>

          <Stack
            pt="5"
            space={3}
            alignItems="center"
            style={styles.mainContainer}
          >
            {inputValue.current.map((input: Input) => (
              <Box
                key={String(input.id)}
                width={"90%"}
                padding={"2%"}
                bg={color_box_BG}
              >
                <Box>
                  <Button
                    style={styles.deleteButton}
                    roundedRight="md"
                    onPress={() => deleteInput(input.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} size={20} />
                  </Button>
                </Box>

                <HStack width="80%" pl="5%" space={1} alignItems="center">
                  <Box width={"50%"}>
                    <FormControl>
                      <Input
                        width="50%"
                        type="text"
                        placeholder="destination"
                        isFullWidth={true}
                        onChangeText={(event) => {
                          inputText(event, input.id);
                        }}
                      />
                    </FormControl>
                  </Box>

                  <Box width={"60%"}>
                    <MultipleSelectList
                      setSelected={(val: any) => setSelected(val)}
                      data={data}
                      save="value"
                      onSelect={() => alert(selected)}
                      label="Categories"
                    />
                  </Box>
                </HStack>

                <HStack width="80%" pl="5%" space={1} alignItems="center">
                  <FormControl>
                    <Select
                      width={"60%"}
                      onValueChange={(itemValue) => {}}
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="2" />,
                      }}
                      placeholder="travelStyle"
                    >
                      <Select.Item
                        label="Road Tripping"
                        value="Road Tripping"
                      />
                      <Select.Item label="Eco-Tourism" value="Eco-Tourism" />
                      <Select.Item label="Cultural" value="Cultural" />
                      <Select.Item label="Luxury" value="Luxury" />
                      <Select.Item label="Adventure" value="Adventure" />
                    </Select>
                  </FormControl>

                  <FormControl>
                    <SelectList
                      setSelected={(val: any) => setSelected(val)}
                      data={budget}
                      save="value"
                      search={false}
                      placeholder="Budget"
                    />
                  </FormControl>
                </HStack>

                <SelectList
                  setSelected={(val: any) => setSelected(val)}
                  data={data}
                  save="value"
                  search={false}
                />
              </Box>
            ))}
          </Stack>

          <HStack
            space="2"
            alignItems="center"
            justifyContent={"center"}
            style={styles.mainContainer2}
          >
            <Center bg="primary.400:alpha.30" rounded="md">
              <Button
                size="16"
                onPress={async () => onSubmit(inputValue.current)}
              >
                Plan Trip
              </Button>
            </Center>
            <Center size="16" bg="white" rounded="md" alignItems={"center"}>
              <Button
                style={styles.addInputButton}
                onPress={addInput}
                textAlign={"center"}
              >
                <FontAwesomeIcon icon={faCirclePlus} size={40} />
              </Button>
            </Center>
          </HStack>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default function PlanTripScreen() {
  return (
    <NativeBaseProvider>
      <CreateInputTab />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: { backgroundColor: color_header_backGround },
  profileIcon: {
    borderColor: "#000",
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 100,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: color_header_backGround,
    justifyContent: "center",
    display: "flex",
    alignItems: "flex-end",
  },
  view_bg: {
    backgroundColor: colour_constainer_bg,
  },
  mainContainer2: {
    height: "25%",
    backgroundColor: colour_constainer_bg,
  },
  mainContainer: {
    height: "35%",
    overflowY: "scroll",
    backgroundColor: colour_constainer_bg,
  },
  addInputButton: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 5,
  },
  deleteButton: {
    backgroundColor: "#fff",
    color: "#",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
