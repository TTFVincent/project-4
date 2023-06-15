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

function Logout() {
  return <View></View>;
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
  navigation.navigate("index");
}

export default function sideNav() {
  return (
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
    </Drawer.Navigator>
  );
}
