import { StyleSheet } from "react-native";
import { Icon, VStack } from "native-base";
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
import React, { useRef, useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { border } from "native-base/lib/typescript/theme/styled-system";
import { useForm } from "react-hook-form";

type Input = {
  id: number;
  text: string;
};
function CreateInputTab() {
  const inputValue = useRef<Input[]>([]);
  const [changed, updateChanged] = useState<boolean>(false)

  const onSubmit = async (inputValue: Input[]) => {
    console.log(`${process.env}`)
    const response = await fetch(`http://localhost:3100/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    });
    const result = await response.json();
    console.log(result);
  };

  const addInput = () => {
    let id: number = inputValue.current[0]
      ? inputValue.current[inputValue.current.length -1].id + 1
      : 0;

    inputValue.current = [...inputValue.current, { id, text: "" }];
    updateChanged(!changed)
    console.log(inputValue.current)
    // setInputs([...inputs, newInput]);
  };

  const deleteInput = (id: number) => {
    const updatedList = inputValue.current.filter((listItem)=>{
      return listItem.id !== id
    })
    inputValue.current = updatedList
    updateChanged(!changed)
  };

  const inputText = (event: any, id: number) => {
    const value = event.target.value;
    const newInput = { id: id, text: value };
    const updatedList = inputValue.current.map((listItem)=>{
      return listItem.id === id? newInput: listItem;
    })
    inputValue.current = updatedList

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
      <HStack space={3} alignItems="center" style={styles.mainContainer2}>
        <Button onPress={async()=> onSubmit(inputValue.current)} >Plan Trip</Button>

        <Button style={styles.addInputButton} onPress={addInput}>
          <FontAwesomeIcon icon={faCirclePlus} size={40} />
        </Button>
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
  },
  mainContainer: {
    borderWidth: 2,
    height: "85%",
    overflowY: "scroll",
  },
  addInputButton: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 5,
  },
  deleteButton: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
