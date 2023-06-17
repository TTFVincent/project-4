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
} from "native-base";
import * as bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import { hashPassword } from "../../components/authentication/hash";
//@ts-ignore
import { back_end_server } from "@env";
import { useTokenStore } from "../../zustand/useTokenStore";
import axios from "axios";
import {
  colour_constainer_bg,
  colour_input_text,
  colour_label_text,
} from "../../components/css/colors";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type Value = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const saveToken = useTokenStore((state: any) => state.saveToken);
  const access_token = useTokenStore((state: any) => state.access_token);
  const [value, setValue] = useState<Value>({ email: "", password: "" });
  const { handleSubmit } = useForm<Value>();

  useEffect(() => {
    const redirectPath = access_token ? "/planTrip" : "/";
    setTimeout(() => !!router && router.push(redirectPath), 250);
  }, [access_token]);

  const onSubmit = async () => {
    const result = await axios.post(`${back_end_server}/auth/sign-in`, value);

    saveToken({
      access_token: result.data.access_token,
      user_id: result.data.user_id,
    });
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${result.data.access_token}`;
    console.log(result.data.access_token);
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
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

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
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button
              onPress={handleSubmit(onSubmit)}
              mt="2"
              colorScheme="indigo"
            >
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Do not have an account.{" "}
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
      <Center bg={colour_constainer_bg} flex={1} px="3">
        <Login />
      </Center>
    </NativeBaseProvider>
  );
};
