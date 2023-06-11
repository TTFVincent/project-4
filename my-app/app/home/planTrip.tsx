import { StyleSheet } from "react-native";
import { Box, Icon, VStack } from "native-base";
import { Text, View } from "../../components/Themed";
import {
  Button,
  Center,
  HStack,
  Heading,
  Input,
  NativeBaseProvider,
  Stack,
} from "native-base";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { usePromptStore } from "../../zustand/usePromptStore"
import { colour_constainer_bg } from "../../components/css/colors";
import { SERVER_ADDRESS } from "@env";

type Input = {
  id: number;
  text: string;
};


function CreateInputTab() {
  const inputValue = useRef<Input[]>([]);
  const [changed, updateChanged] = useState<boolean>(false);
  const prompt = usePromptStore((state:any)=>state.savePrompt)

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
    prompt(result.message)

  };

  const addInput = () => {
    let id: number = inputValue.current[0]
      ? inputValue.current[inputValue.current.length - 1].id + 1
      : 0;

    inputValue.current = [...inputValue.current, { id, text: "" }];
    updateChanged(!changed);
    console.log(inputValue.current);
    // setInputs([...inputs, newInput]);
  };

  const deleteInput = (id: number) => {
    const updatedList = inputValue.current.filter((listItem) => {
      return listItem.id !== id;
    });
    inputValue.current = updatedList;
    updateChanged(!changed);
  };

  const inputText = (event: any, id: number) => {
    const value = event.target.value;
    const newInput = { id: id, text: value };
    const updatedList = inputValue.current.map((listItem) => {
      return listItem.id === id ? newInput : listItem;
    });
    inputValue.current = updatedList;
  };

  return (
    <>
      <Stack pt="5" space={3} alignItems="center" style={styles.mainContainer}>
        {inputValue.current.map((input: Input) => (
          <HStack
            key={String(input.id)}
            width="80%"
            pl="10%"
            space={3}
            alignItems="center"
          >
            <Input
              flexWrap={"wrap"}
              width="80%"
              type="text"
              placeholder="Description"
              isFullWidth={true}
              onChange={(event) => {
                inputText(event, input.id);
              }}
            />
            <Button
              ml={0}
              style={styles.deleteButton}
              roundedRight="md"
              onPress={() => deleteInput(input.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} size={20} />
            </Button>
          </HStack>
        ))}
      </Stack>

      <HStack space="2" alignItems="center" justifyContent={"center"} style={styles.mainContainer2}>
        <Center  bg="primary.400:alpha.30" rounded="md" >
          <Button size="16" onPress={async () => onSubmit(inputValue.current)}>
            Plan Trip
          </Button>
        </Center>
        <Center size="16" bg="white" rounded="md" alignItems={"center"}>
          <Button  style={styles.addInputButton} onPress={addInput} textAlign={"center"}>
            <FontAwesomeIcon icon={faCirclePlus} size={40} />
          </Button>
        </Center>
      </HStack>
    </>
  );
}

export default function TabOneScreen() {
  return (
    <NativeBaseProvider>
      <CreateInputTab />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer2: {
    height: "15%",
    backgroundColor: colour_constainer_bg,

  },
  mainContainer: {
    height: "85%",
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
    color: "#"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
});
