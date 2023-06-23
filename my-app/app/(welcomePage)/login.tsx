import React, { useEffect, useState } from "react";
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
} from "native-base";
import * as bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import { hashPassword } from "../../components/authentication/hash";
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
} from "react-native";
import { setStorageValue } from "../../constants/Storage";
import { post } from "../../api";

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
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Image
            source={require("../../assets/photos/image5.jpg")}
            height={"40%"}
            mb={3}
          />

          <Center>
            <Heading
              size="sm"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>
          </Center>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                color={colour_input_text}
                onChangeText={(event) => updateFormValue(event, "email")}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                color={colour_input_text}
                onChangeText={(event) => updateFormValue(event, "password")}
                type="password"
              />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDir={"row"}
                alignItems={"center"}
              >
                <Checkbox
                  value="true"
                  onChange={(e) => {
                    setRememberMe(e);
                  }}
                  style={style.checkbox}
                >
                  Remeber me
                </Checkbox>
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                >
                  Forget Password?
                </Link>
              </Box>
            </FormControl>

            <View>
              <Text>{error}</Text>
            </View>

            <Button
              onPress={handleSubmit(onSubmit)}
              mt="2"
              colorScheme="indigo"
            >
              Sign in
            </Button>
            <HStack mt="2" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Do not have an account.
              </Text>
              <Text
                onPress={() => {
                  router.push("/register");
                }}
                color={colour_label_text}
              >
                Sign Up
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Center>
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

const style = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
  },
});
