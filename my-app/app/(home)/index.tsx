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
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { getValueFor, saveValue } from "../../constants/Storage";

type Value = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const saveToken = useTokenStore((state: any) => state.saveToken);
  const useAccess_token = useTokenStore((state) => state.access_token);
  const user_id = useTokenStore((state) => state.user_id);
  const [value, setValue] = useState<Value>({ email: "", password: "" });
  const { handleSubmit } = useForm<Value>();
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  async function loadToken() {
    let user_id = await getValueFor("userId");
    let token = await getValueFor("token");

    console.log("STORAGE ID", user_id);
    console.log("STORAGE Token", token);

    if (token) {
      console.log("idFromLocal", user_id);

      saveToken({ access_token: token, user_id: user_id });
      redirectPath();
    }
  }

  function redirectPath() {
    // const redirectPath = useAccess_token ? "/planTrip" : "/";
    setTimeout(() => !!router && router.push("/planTrip"), 250);
  }

  useEffect(() => {
    loadToken();
  }, []);

  const onSubmit = async () => {
    const result = await axios.post(`${back_end_server}/auth/sign-in`, value);

    // Login success
    if (result.data.access_token) {
      console.log("result.data", result.data);

      saveToken({
        access_token: result.data.access_token,
        user_id: result.data.user_id,
      });

      console.log("first: " + result.data.user_id);
      console.log("second: " + result.data.user_id);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access_token}`;

      if (rememberMe) {
        console.log(" token saved");
        await saveValue("userId", result.data.user_id + "");
        await saveValue("token", result.data.access_token);
      }

      console.log(result.data.access_token);
      redirectPath();
    } else {
      // Login failed
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
          {/* <Image
            source={require("../../assets/images/icon.png")}
            height={"40%"}
            mb={3}
          />
 */}
          {/* <Center>
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
          </Center> */}
          <Text fontSize={5}>fetch Token: {useAccess_token}</Text>
          <Text fontSize={5}>fetch id: {user_id}</Text>
          {/* <Text fontSize={5}>local Token: {localToken}</Text>
          <Text fontSize={5}>local id: {localId}</Text> */}

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
