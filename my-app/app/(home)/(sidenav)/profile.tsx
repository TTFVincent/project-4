import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  Box,
  Center,
  Container,
  NativeBaseProvider,
  Text,
  View,
  Image,
  Button,
} from "native-base";
import { StyleSheet } from "react-native";
import { colour_container_bg } from "../../../components/css/colors";
import React, { useContext, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from "@rpldy/native-uploady";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const Upload = async () => {
  let file = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: false,
    type: "image/*",
  });
  const pic = FileSystem.documentDirectory + "picture.png";
  FileSystem.copyAsync({
    from: "../../../assets/images/exit.bmp",
    to: "../../../assets/profilePic",
  });
};

export default function Profile() {
  return (
    <NativeBaseProvider>
      <View style={styles.mainContainer}>
        <Center flex={1}>
          <Box style={styles.profile_pic_container}>
            <Image
              alt="Profile Picture"
              size={"100%"}
              source={require("../../../assets/images/exit.bmp")}
            />
          </Box>
          <Button onPress={Upload}>Change Picture</Button>
          <Text style={styles.text_size}>NAME: {}</Text>
        </Center>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  uploadedImage: {
    width: 20,
    height: 20,
  },
  text_size: {
    fontSize: 20,
    margin: 20,
  },
  mainContainer: {
    backgroundColor: colour_container_bg,
    height: "100%",
    width: "100%",
  },
  profile_pic_container: {
    height: 200,
    width: 200,
    borderColor: "#fff",
    borderWidth: 5,
    borderRadius: 200,
    overflow: "hidden",
  },
});
