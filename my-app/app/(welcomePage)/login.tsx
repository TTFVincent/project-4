import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Link,
  Image,
  Checkbox,
  Spacer,
  ScrollView,
  KeyboardAvoidingView,
  ZStack,
} from "native-base";
import { useForm } from "react-hook-form";
//@ts-ignore
import { back_end_server } from "@env";
import { useTokenStore } from "../../zustand/useTokenStore";
import axios from "axios";
import {
  colour_container_bg,
  colour_input_text,
  colour_label_text,
} from "../../components/css/colors";
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { setStorageValue } from "../../constants/Storage";
import { post } from "../../api";
import { ButtonShadowProps, PrimaryButtonProps } from "../../constants/Button";
import { RobotoText, RobotoBoldText } from "../../components/StyledText";

type Value = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const saveToken = useTokenStore((state: any) => state.setState);
  const [value, setValue] = useState<Value>({ email: "", password: "" });
  const { handleSubmit } = useForm<Value>();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  function redirectPath() {
    setTimeout(() => !!router && router.push("/planTrip"), 250);
  }

  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      // const result = await axios.post(`${back_end_server}/auth/sign-in`, value);
      const result = await post(`/auth/sign-in`, value);
      console.log("login result:", result);

      // Login success
      if (result.access_token) {
        saveToken({
          access_token: result.access_token,
          user_id: result.user_id,
        });

        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${result.data.access_token}`;

        if (rememberMe) {
          await setStorageValue("userId", result.user_id + "");
          await setStorageValue("token", result.access_token);
        }

        redirectPath();
      } else {
        // Login failed
      }
    } catch (error) {
      console.log("login error:", error);
      setError(String(error));
    }
  };

  const updateFormValue = (event: any, param: string) => {
    let originalInput = value;
    let newInput: string = event;
    originalInput[param as keyof Value] = newInput;
    setValue(originalInput);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box safeArea p="2" w="100%" maxW="290">
          <Image
            source={require("../../assets/photos/image5.jpg")}
            height={"40%"}
            mb={3}
          />

          <RobotoBoldText fontSize={"md"}>
            Unlock Full Potential!
          </RobotoBoldText>

          <VStack mt={2}>
            <FormControl>
              <FormControl.Label>
                <RobotoText>Email ID</RobotoText>
              </FormControl.Label>
              <Input
                color={colour_input_text}
                onChangeText={(event) => updateFormValue(event, "email")}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <RobotoText>Password</RobotoText>
              </FormControl.Label>
              <Input
                color={colour_input_text}
                onChangeText={(event) => updateFormValue(event, "password")}
                type="password"
              />
              <Box>
                <Link alignSelf="flex-end">
                  <RobotoText fontSize={"xs"}>Forget Password?</RobotoText>
                </Link>
              </Box>
              <Box>
                <Checkbox
                  value="true"
                  onChange={(e) => {
                    setRememberMe(e);
                  }}
                >
                  <RobotoText fontSize={"xs"}>Remember me</RobotoText>
                </Checkbox>
              </Box>
            </FormControl>

            <View>
              <RobotoText>{error}</RobotoText>
            </View>
            <ZStack m="auto" w="80%" h="15%" reversed>
              <Button
                w="100%"
                h="95%"
                onPress={handleSubmit(onSubmit)}
                {...PrimaryButtonProps}
              >
                <RobotoText>SIGN IN</RobotoText>
              </Button>
              <Box {...ButtonShadowProps} w="100%" h="95%" />
            </ZStack>
            <HStack mt="2" justifyContent="center">
              <RobotoText>Do not have an account.</RobotoText>
              <RobotoText
                onPress={() => {
                  router.push("/register");
                }}
                color={colour_label_text}
              >
                Sign Up
              </RobotoText>
            </HStack>
          </VStack>
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center bg={colour_container_bg} flex={1} px="3">
        <Login />
      </Center>
    </NativeBaseProvider>
  );
};
