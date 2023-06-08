import { StyleSheet, Platform } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { usePromptStore } from "../../zustand/usePromptStore"
import { colour_constainer_bg } from "../../components/css/colors";
import { useRegisterStore } from "../../zustand/useRegisterStore";



// function Map() {
//       return (
//           <MapView
//             style={styles.mapContainer}
//             provider={PROVIDER_GOOGLE}
//             initialRegion={{
//                 latitude: 22.343813260980898,
//                 longitude: 114.1887436490869,
//                 latitudeDelta: 0.15,
//                 longitudeDelta: 0.15,
//               }}
//             />
//           );
//         }
      
export default function TabTwoScreen() {
  console.log(Platform.OS);
  const prompt = usePromptStore((state:any)=>state.promptList);
  const showDate = useRegisterStore((state:any)=>state.showDate);

  return (
    <View style={styles.container}>
    {/* <Map /> */}
      <Text style={styles.text}>{prompt}</Text>
      <Text style={styles.text}>{showDate.day}-{showDate.month}-{showDate.year}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colour_constainer_bg,

    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mapContainer: {
    height: "50%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    color: "red",
  }
});
