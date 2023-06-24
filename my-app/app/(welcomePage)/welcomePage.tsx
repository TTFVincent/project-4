import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  NativeBaseProvider,
  Spacer,
  View,
  Text,
  HStack,
  ZStack,
} from "native-base";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import {
  color_button_BG,
  colour_container_bg,
} from "../../components/css/colors";
// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from "react-native";
import { RobotoBoldText, RobotoText } from "../../components/StyledText";
import {
  ButtonShadowProps,
  SecondaryButtonProps,
} from "../../constants/Button";

export default function welcomePage() {
  const router = useRouter();
  const [images, setImages] = React.useState<string[]>([
    require("../../assets/photos/image2.jpg"),
    require("../../assets/photos/image3.jpg"),
    require("../../assets/photos/image4.jpg"),
  ]);

  return (
    <NativeBaseProvider>
      <View style={style.body}>
        <Center flex={1}>
          <RobotoBoldText textAlign={"center"} fontSize={"3xl"}>
            Wanderlust AI
          </RobotoBoldText>

          <Box w="60%">
            <RobotoText fontSize={"sm"}>
              Let AI do the work, so you can enjoy your trip
            </RobotoText>
          </Box>

          <View style={style.slideViewContainer}>
            <SliderBox
              style={style.images}
              images={images}
              sliderBoxHeight={400}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              onCurrentImagePressed={(index: any) =>
                console.warn(`image ${index} pressed`)
              }
              paginationBoxVerticalPadding={20}
              autoplay
              autoplayInterval={8000}
              circleLoop
            ></SliderBox>
            <StatusBar />
          </View>

          <HStack w="100%" h="6%" justifyContent="space-evenly">
            <ZStack w="30%" reversed>
              <Button
                {...SecondaryButtonProps}
                w="100%"
                h="95%"
                onPress={() => {
                  router.push("/login");
                }}
              >
                <RobotoText>LOGIN</RobotoText>
              </Button>
              <Box {...ButtonShadowProps} w="100%" h="95%" />
            </ZStack>
            <ZStack w="30%" reversed>
              <Button
                {...SecondaryButtonProps}
                w="100%"
                h="95%"
                onPress={async () => {
                  router.push("/register");
                }}
              >
                <RobotoText>REGISTER</RobotoText>
              </Button>
              <Box {...ButtonShadowProps} w="100%" h="95%" />
            </ZStack>
          </HStack>
        </Center>
      </View>
    </NativeBaseProvider>
  );
}

const style = StyleSheet.create({
  images: {
    marginLeft: "10%",
    height: "100%",
    width: "80%",
  },
  slideViewContainer: {
    height: "40%",
    marginVertical: 50,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: colour_container_bg,
    width: "100%",
    height: "100%",
  },
  buttons: {
    color: "#0f0",
    backgroundColor: color_button_BG,
    width: 100,
    height: 40,
  },
});
