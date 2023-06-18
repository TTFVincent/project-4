import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  Text,
  ScrollView,
  CheckIcon,
  Select,
  Flex,
  HStack,
} from "native-base";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  colour_container_bg,
  colour_input_text,
  colour_label_text,
} from "../../components/css/colors";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { Select_date } from "../../components/register/select_date";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useRef } from "react";
import { IInputComponentType } from "native-base/lib/typescript/components/primitives/Input/types";
//@ts-ignore
import { back_end_server } from "@env";
import { hashPassword } from "../../components/authentication/hash";
import { useRouter } from "expo-router";
export type SetDate = {
  day: string;
  month: string;
  year: string;
};

type RegisterForm = {
  user_name: string;
  email: string;
  password: string;
  Confirm_password: string;
};

const Register = () => {
  const [state, setState] = useState<boolean>(true);
  const [date, setdate] = useState<SetDate>({
    day: "",
    month: "",
    year: "",
  });

  const saveDate = useRegisterStore((state: any) => state.saveDate);
  saveDate(date);

  const formInfo = useRef<RegisterForm>({
    user_name: "",
    email: "",
    password: "",
    Confirm_password: "",
  });

  function ShowPasswordCheck() {
    return state ? (
      <>
        <FormControl>
          <FormControl.Label _text={{ color: colour_label_text }}>
            Password
          </FormControl.Label>
          <Input
            onChangeText={(value: any) => {
              formInfo.current.password = value;
            }}
            color={colour_input_text}
            type="password"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text color={colour_label_text}>Confirm Password</Text>
          </FormControl.Label>
          <Input
            onChangeText={(value: any) => {
              formInfo.current.Confirm_password = value;
            }}
            color={colour_input_text}
            type="password"
          />
        </FormControl>
      </>
    ) : (
      <>
        <FormControl>
          <FormControl.Label _text={{ color: colour_label_text }}>
            Password
          </FormControl.Label>
          <Input
            isRequired={true}
            onChangeText={(value: any) => {
              formInfo.current.password = value;
            }}
            color={colour_input_text}
            type="password"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text color={colour_label_text}>Confirm Password</Text>
          </FormControl.Label>
          <Input
            isRequired={true}
            onChangeText={(value: any) => {
              formInfo.current.Confirm_password = value;
            }}
            color={colour_input_text}
            type="password"
          />
          <Text>password is not match</Text>
        </FormControl>
      </>
    );
  }

  const onSubmit = async () => {
    console.log(formInfo.current);
    let currentState: boolean;
    formInfo.current.password != formInfo.current.Confirm_password
      ? (setState(false), (currentState = false))
      : (setState(true), (currentState = true));
    if (currentState == true) {
      let testUser = {
        birthDay: date,
        username: formInfo.current.user_name,
        email: formInfo.current.email,
        password: formInfo.current.password,
      };

      console.log(testUser);
      const response = await fetch(`${back_end_server}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testUser),
      });
      const result = await response.json();

      console.log(result);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>
                <Text color={colour_label_text}>User Name</Text>
              </FormControl.Label>
              <Input
                isRequired={true}
                onChangeText={(value: any) => {
                  formInfo.current.user_name = value;
                }}
                color={colour_input_text}
              />
            </FormControl>
            <Select_date setdate={setdate} />
            <FormControl>
              <FormControl.Label>
                <Text color={colour_label_text}>Email</Text>
              </FormControl.Label>
              <Input
                isRequired={true}
                onChangeText={(value: any) => {
                  formInfo.current.email = value;
                }}
                color={colour_input_text}
              />
            </FormControl>

            <ShowPasswordCheck />

            <Button
              mt="2"
              colorScheme="indigo"
              onPress={() => {
                onSubmit();
                console.log();
              }}
            >
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Center overflowY="scroll" flex={1} px="3">
          <Register />
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colour_container_bg,
  },
  inputText: {},
});
