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
  KeyboardAvoidingView,
  ZStack,
} from "native-base";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
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
import { useTokenStore } from "../../zustand/useTokenStore";
import { ButtonShadowProps, PrimaryButtonProps } from "../../constants/Button";
import { RobotoBoldText, RobotoText } from "../../components/StyledText";

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

  const router = useRouter();
  const saveToken = useTokenStore((state: any) => state.setState);
  const saveDate = useRegisterStore((state: any) => state.saveDate);
  const loginState = useTokenStore((state: any) => state.state);
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
          <FormControl.Label>
            <RobotoText>Password</RobotoText>
          </FormControl.Label>
          <Input
            fontSize={12}
            fontFamily="RobotoMono"
            borderRadius={0}
            placeholder="Enter your password"
            onChangeText={(value: any) => {
              formInfo.current.password = value;
            }}
            color={colour_input_text}
            type="password"
          />
        </FormControl>
        <FormControl mt={3}>
          <FormControl.Label>
            <RobotoText>Confirm Password</RobotoText>
          </FormControl.Label>
          <Input
            fontSize={12}
            fontFamily="RobotoMono"
            placeholder="Enter your password again"
            borderRadius={0}
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
          <FormControl.Label>
            <RobotoText>Password</RobotoText>
          </FormControl.Label>
          <Input
            fontSize={12}
            fontFamily="RobotoMono"
            placeholder="Enter your password"
            borderRadius={0}
            isRequired={true}
            onChangeText={(value: any) => {
              formInfo.current.password = value;
            }}
            color={colour_input_text}
            type="password"
          />
        </FormControl>
        <FormControl mt={3}>
          <FormControl.Label>
            <RobotoText>Confirm Password</RobotoText>
          </FormControl.Label>
          <Input
            fontSize={12}
            fontFamily="RobotoMono"
            placeholder="Enter your password again"
            borderRadius={0}
            isRequired={true}
            onChangeText={(value: any) => {
              formInfo.current.Confirm_password = value;
            }}
            color={colour_input_text}
            type="password"
          />
          <RobotoText>password is not match</RobotoText>
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
      saveToken(result.access_token);
      if (loginState.token) {
        router.push("/planTrip");
      }
      console.log(result);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box safeArea p="2" w="100%" maxW="290">
        <RobotoBoldText fontSize={"md"}>
          Your first step towards greatness!
        </RobotoBoldText>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>
              <RobotoText>User Name</RobotoText>
            </FormControl.Label>
            <Input
              fontSize={12}
              fontFamily="RobotoMono"
              placeholder="Enter your name"
              borderRadius={0}
              isRequired={true}
              onChangeText={(value: any) => {
                formInfo.current.user_name = value;
              }}
              color={colour_input_text}
            />
          </FormControl>
          {/* <Select_date setdate={setdate} /> */}
          <FormControl>
            <FormControl.Label>
              <RobotoText>Email</RobotoText>
            </FormControl.Label>
            <Input
              fontSize={12}
              fontFamily="RobotoMono"
              placeholder="Enter your email"
              borderRadius={0}
              isRequired={true}
              onChangeText={(value: any) => {
                formInfo.current.email = value;
              }}
              color={colour_input_text}
            />
          </FormControl>

          <ShowPasswordCheck />

          <ZStack mt={4} m="auto" w="80%" h="14%" reversed>
            <Button w="100%" h="95%" onPress={onSubmit} {...PrimaryButtonProps}>
              <RobotoText>SIGN UP</RobotoText>
            </Button>
            <Box {...ButtonShadowProps} w="100%" h="95%" />
          </ZStack>
        </VStack>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center bg={colour_container_bg} flex={1} w="100%">
          <Register />
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};
