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
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
        <Center>
          <Box style={styles.profile_pic_container}>
            <Image
              alt="Profile Picture"
              size={"100%"}
              source={require("../../../assets/images/exit.bmp")}
            />
          </Box>
          <Button onPress={Upload}>Change Picture</Button>
          <Text style={styles.NameText}>NAME: {}</Text>

          <Box style={styles.buttons}>
            <Text style={styles.buttonText}>My itinerary</Text>
            <FontAwesomeIcon size={30} icon={faAngleRight} />
          </Box>
          <Box style={styles.buttons}>
            <Text style={styles.buttonText}>Transport</Text>
            <FontAwesomeIcon size={30} icon={faAngleRight} />
          </Box>
          <Box style={styles.buttons}>
            <Text style={styles.buttonText}>Edit </Text>
            <FontAwesomeIcon size={30} icon={faAngleRight} />
          </Box>
          <Box style={styles.buttons}>
            <Text style={styles.buttonText}>Setting</Text>
            <FontAwesomeIcon size={30} icon={faAngleRight} />
          </Box>
        </Center>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttons: {
    width: "80%",
    height: 60,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  uploadedImage: {
    width: 20,
    height: 20,
  },
  NameText: {
    fontSize: 20,
    margin: 10,
  },
  mainContainer: {
    backgroundColor: colour_container_bg,
    height: "100%",
    width: "100%",
  },
  profile_pic_container: {
    height: 100,
    width: 100,
    marginTop: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 150,
    overflow: "hidden",
  },
});
