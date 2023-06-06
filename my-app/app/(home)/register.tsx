import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import { colour_constainer_bg, colour_input_text, colour_label_text } from "../../components/css/colors";
import { color } from "native-base/lib/typescript/theme/styled-system";
const Register = () => {
  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl  >
            <FormControl.Label color={"white"}>Email</FormControl.Label> {/*tobe done*/}
            <Input color={colour_label_text}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input color={colour_input_text} type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input color={colour_input_text} type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider >
            <Center flex={1} px="3" style={styles.container}> 
                <Register />
            </Center>
          </NativeBaseProvider>
        );
    };
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: colour_constainer_bg,
      },
      inputText: {
      }
    });
