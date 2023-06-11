import * as React from "react";
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
import { StyleSheet } from "react-native";
import {
  colour_constainer_bg,
  colour_input_text,
  colour_label_text,
  show_border,
} from "../../components/css/colors";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { Select_date } from "../../components/register/select_date";
import { useRegisterStore } from "../../zustand/useRegisterStore";
import { useRef } from "react";
import { IInputComponentType } from "native-base/lib/typescript/components/primitives/Input/types";
import { SERVER_ADDRESS } from "@env";
import { hashPassword } from "../../components/authentication/hash";
let status: boolean;
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
  const [date, setdate] = React.useState<SetDate>({
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

  function PasswordCheck() {
    if (formInfo.current.password != formInfo.current.Confirm_password) {
      status = false;
      return (
        <>
          <FormControl>
            <FormControl.Label _text={{ color: colour_label_text }}>
              Password
            </FormControl.Label>
            <Input
              onChange={(event: any) => {
                formInfo.current.password = event.target.value;
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
              onChange={(event: any) => {
                formInfo.current.Confirm_password = event.target.value;
              }}
              color={colour_input_text}
              type="password"
            />
            <Text>password is not match</Text>
          </FormControl>
        </>
      );
    }
    return (
      <>
        <FormControl>
          <FormControl.Label _text={{ color: colour_label_text }}>
            Password
          </FormControl.Label>
          <Input
            onChange={(event: any) => {
              formInfo.current.password = event.target.value;
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
            onChange={(event: any) => {
              formInfo.current.Confirm_password = event.target.value;
            }}
            color={colour_input_text}
            type="password"
          />
        </FormControl>
      </>
    );
  }

  const onSubmit = async () => {


    if ((status = true)) {
      let testUser = {
        username: formInfo.current.user_name,
        email: formInfo.current.email,
        password: formInfo.current.password,
      };

      console.log(testUser);
      const response = await fetch(`${SERVER_ADDRESS}/auth/sign-up`, {
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
              onChange={(event: any) => {
                formInfo.current.user_name = event.target.value;
              }}
              color={colour_label_text}
            />
          </FormControl>
          <Select_date setdate={setdate} />
          <FormControl>
            <FormControl.Label>
              <Text color={colour_label_text}>Email</Text>
            </FormControl.Label>
            <Input
              onChange={(event: any) => {
                formInfo.current.email = event.target.value;
              }}
              color={colour_label_text}
            />
          </FormControl>

          <PasswordCheck />

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
    backgroundColor: colour_constainer_bg,
  },
  inputText: {},
});
