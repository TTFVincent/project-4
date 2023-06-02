import { StyleSheet } from 'react-native';
import { Icon, VStack } from 'native-base';
import { Text, View } from '../../components/Themed';
import { Button, Center, HStack, Heading, Input, NativeBaseProvider, Stack } from 'native-base';
import React, { useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { border } from 'native-base/lib/typescript/theme/styled-system';
import { useForm } from 'react-hook-form';

type Input = {
  id: Number
}

function CreateInputTab() {

  const { handleSubmit} = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    const response = await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };


    const [inputs, setInputs] = useState<{ id: number }[]>([]);
  

  const addInput = () => {
    const newInput = { id: inputs.length + 1 };
    setInputs([...inputs, newInput]);
  };

  const deleteInput = (id: Number) => {
    const updatedInputs = inputs.filter((input: Input) => input.id !== id);
    setInputs(updatedInputs);
  };

  return <><Stack pt="5" space={3} alignItems="center" style={styles.mainContainer}>
      
      {inputs.map((input: Input) => (
        <HStack key={String(input.id)} width="80%" pl="10%" space={3} alignItems="center">
          <Input flexWrap={'wrap'} width="80%" type="text" placeholder="Description" isFullWidth={true}/>
          <Button ml={0} style={styles.deleteButton} roundedRight="md" onPress={() => deleteInput(input.id)}>
            <FontAwesomeIcon icon={faTrashCan} size={20} />
          </Button>
        </HStack>
      ))}
    </Stack>
    <VStack space={3} alignItems="center" style={styles.mainContainer2}>
      <Button style={styles.addInputButton} onPress={addInput}><FontAwesomeIcon icon={faCirclePlus} size={40}/></Button>
    </VStack>
    </>
}

export default function TabOneScreen() {

  return (
    <NativeBaseProvider>
      <CreateInputTab/>
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer2:{
    height: "15%"

  },
  mainContainer:{
    borderWidth: 2,
    height: "85%",
    overflowY: "scroll",

  },
  addInputButton: {
    position: 'absolute',
    backgroundColor: "#fff",
    bottom: 5
  },
  deleteButton: {
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
