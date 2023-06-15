import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';
import Colors from "../../constants/Colors";
import { useTokenStore } from "../../zustand/useTokenStore";
import { color_header_backGround } from "../../components/css/colors";
// import Index from "./index"
// import { Keyboard } from "react-native";
// import { KeyboardAvoidingView } from "react-native";
// import { NativeBaseProvider, View } from "native-base";
// import { TouchableWithoutFeedback } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isLoginToken = useTokenStore((state: any) => state.access_token);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          // tabBarStyle: {display: "none"},
          // href: isLoginToken ? "/planTrip" : "/",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          tabBarStyle: { display: "none" },

          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(sidenav)"
        options={{
          // href: isLoginToken ? "/planTrip" : "/",
          headerStyle: { backgroundColor: color_header_backGround },
          headerShown: false,
          headerTitleAlign: "center",
          title: "Plan Trip",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="googleMap"
        options={{
          title: "google map",
          // href: isLoginToken ? "/googleMap" : "/",

          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}
