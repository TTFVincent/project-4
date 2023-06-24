import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useColorScheme } from "react-native";
import PlanTrip from "./planTrip";
import { useTokenStore } from "../../../zustand/useTokenStore";
import { color_header_backGround } from "../../../components/css/colors";
import Profile from "./profile";
import React from "react";
import MyTripPage from "./myTripPage";
import { deleteStorageValue } from "../../../constants/Storage";
import { TripsProvider } from "../../../context/personalTripContext";
import { useRouter } from "expo-router";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const setTokenState = useTokenStore((store) => store.setState);
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          setTokenState(null);
          deleteStorageValue("token");
          router.push("/welcomePage");
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function sideNav() {
  return (
    <TripsProvider>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="planTrip"
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
      >
        <Drawer.Screen
          name="planTrip"
          component={PlanTrip}
          options={{
            headerStyle: { backgroundColor: color_header_backGround },
            headerTitleStyle: {
              color: "#000000",
              fontFamily: "RobotoMono",
              fontWeight: "bold",
            },
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
            headerTitleStyle: {
              color: "#000000",
              fontFamily: "RobotoMono",
              fontWeight: "bold",
            },
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
            headerTitleStyle: {
              color: "#000000",
              fontFamily: "RobotoMono",
              fontWeight: "bold",
            },
            headerShown: true,
            headerTitleAlign: "center",
            title: "MyTrip",
          }}
        />
      </Drawer.Navigator>
    </TripsProvider>
  );
}
