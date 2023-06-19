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

export default function welcomePage() {
  const router = useRouter();
  const [images, setImages] = React.useState([
    require("../../assets/images/exit.bmp"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/splash.png"),
  ]);
  return (
    <NativeBaseProvider>
      <View style={style.body}>
        <Center flex={1}>
          <Box style={style.headerContainer}>
            <Text fontWeight={"bold"} fontSize={"4xl"}>
              Lazy Trip Plainer
            </Text>
          </Box>

          <Box style={style.textContainer}>
            <Text fontSize={"lg"}>
              you can plan your trip with just one click
            </Text>
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

          <Flex direction="row">
            <Spacer />
            <Button
              style={style.buttons}
              onPress={() => {
                router.push("/");
              }}
            >
              Login
            </Button>
            <Spacer />
            <Button
              style={style.buttons}
              onPress={() => {
                router.push("/register");
              }}
            >
              Register
            </Button>
            <Spacer />
          </Flex>
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
    width: 327,
    height: 102,
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
