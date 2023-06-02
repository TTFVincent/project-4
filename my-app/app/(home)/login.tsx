import React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useForm, Controller, Form  } from 'react-hook-form'
// import { env } from "../../env";

type FormData = {
  email: string;
  password: string;
};


 const Example = () => {

  const { handleSubmit, register, setValue} = useForm<FormData>();
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

    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
  
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button onPress={handleSubmit(onSubmit)} mt="2" colorScheme="indigo">
              Sign in
            </Button >
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>;
  };

  export default () => {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3">
            <Example />
        </Center>
      </NativeBaseProvider>
    );
};
