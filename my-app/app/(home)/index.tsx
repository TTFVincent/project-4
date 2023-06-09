import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
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
import { useForm, } from "react-hook-form";
import { hashPassword } from "../../components/authentication/hash";
import { SERVER_ADDRESS } from "@env";


type Value = {
  email: string;
  password: string;
};
const SubmitLogin = () => {
  const router = useRouter();
  const [value, setValue] = useState<Value>({email:"", password: ""});
  const { handleSubmit } = useForm<Value>();

  
  const onSubmit = async () => {

    value.password = await hashPassword(value.password)



    const response = await fetch(`${SERVER_ADDRESS}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const result = await response.json();
    console.log(result);
  };

  const updateFormValue = (event:any, param:string) => {
    let originalInput = value
    let newInput: string =  event.target.value
    originalInput[param as keyof Value] = newInput
    setValue(originalInput)
  }

  return (
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
              onChange={(event)=>updateFormValue(event, "email")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChange={(event)=>updateFormValue(event, "password")}
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
          <Button onPress={handleSubmit(onSubmit)} mt="2" colorScheme="indigo">
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
      >
        Settings
      </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({

_text:{
  color: "indigo.500",
  fontWeight: "normal",
  fontSize: 6,
}
})
export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <SubmitLogin />
      </Center>
    </NativeBaseProvider>
  );
};

