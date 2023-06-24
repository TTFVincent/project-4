import { Box, Center, NativeBaseProvider, ZStack, Text } from "native-base";
import React from "react";
import { RobotoText } from "../../components/StyledText";

export default function welcomePage() {
  return (
    <NativeBaseProvider>
      <Center h="40">
        <Box mt="-32">
          <ZStack mt="3" ml={-50}>
            <Box bg="primary.700" size="20" rounded="lg" shadow={3} />
            <Box
              bg="primary.500"
              mt="1"
              ml="1"
              size="20"
              rounded="lg"
              shadow={5}
            />
            <Box
              bg="primary.300"
              mt="2"
              ml="2"
              size="20"
              rounded="lg"
              shadow={7}
            />
          </ZStack>
        </Box>
        <RobotoText>hi esafgbsefgb</RobotoText>
        <Text>hi aegaegxdfghb</Text>
      </Center>
    </NativeBaseProvider>
  );
}
