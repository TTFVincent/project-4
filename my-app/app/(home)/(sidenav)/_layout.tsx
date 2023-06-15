import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Button, View } from "react-native";
import PlanTrip from "./planTrip";
import { useTokenStore } from "../../../zustand/useTokenStore";
import { useRouter } from "expo-router";
import { color_header_backGround } from "../../../components/css/colors";

function Logout() {
  return <View></View>;
}

const Drawer = createDrawerNavigator();

export default function sideNav() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="planTrip">
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
      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
}
