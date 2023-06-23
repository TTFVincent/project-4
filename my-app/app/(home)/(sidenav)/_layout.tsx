import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Button, View } from "react-native";
import PlanTrip from "./planTrip";
import { useTokenStore } from "../../../zustand/useTokenStore";
import { useRouter } from "expo-router";
import { color_header_backGround } from "../../../components/css/colors";
import Profile from "./profile";
import React from "react";
import MyTripPage from "./myTripPage";
import { saveValue } from "../../../constants/Storage";
import { TripsProvider } from "../../../context/personalTripContext";
import MapPickPage from "../(modal)/mapPickPage";
function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const saveToken = useTokenStore((state: any) => state.saveToken);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => signOut(props.navigation, saveToken)}
      />
    </DrawerContentScrollView>
  );
}

function signOut(navigation: any, saveToken: any) {
  saveToken({
    access_token: null,
    user_id: null,
  });
  saveValue("token", "");
  navigation.navigate("index");
}

export default function sideNav() {
  return (
    <TripsProvider>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="planTrip"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="planTrip"
          component={PlanTrip}
          options={{
            headerStyle: { backgroundColor: color_header_backGround },
            headerShown: true,
            headerTitleAlign: "center",
            title: "Plan Trip",
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: { backgroundColor: color_header_backGround },
            headerShown: true,
            headerTitleAlign: "center",
            title: "Profile",
          }}
        />
        <Drawer.Screen
          name="myTripPage"
          component={MyTripPage}
          options={{
            headerStyle: { backgroundColor: color_header_backGround },
            headerShown: true,
            headerTitleAlign: "center",
            title: "MyTrip",
          }}
        />
      </Drawer.Navigator>
    </TripsProvider>
  );
}
