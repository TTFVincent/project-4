import {
  Box,
  Center,
  NativeBaseProvider,
  ZStack,
  Text,
  Image,
} from "native-base";
import React from "react";
import { RobotoText } from "../../components/StyledText";

export default function welcomePage() {
  return (
    <NativeBaseProvider>
      <Center h="40%">
        <Image
          source={{
            uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AZose0kj3wmEmqmEZlfCbvoMRu3yt3bHELlNBh0ph8KMUQFGXDbhIPQb6zHkrCU2Mi1nN9zIAujbTykCcmPeXMzN1UT185cGjvlmGgw1rdKakHH7pzmSbk5Ba5dY3SRV7SkTtFr-PH7D2uHAMuKMMw--7cfrgl6Ryz8Rm0NcWKmKhC9OYaqK&key=AIzaSyAl6AErrvZsiAnJjIi22SGimwBJDehvd9s",
          }}
          alt="Alternate Text"
          style={{ width: 100, height: 100 }}
        />
        <RobotoText>hi esafgbsefgb</RobotoText>
        <Text>hi aegaegxdfghb</Text>
      </Center>
    </NativeBaseProvider>
  );
}
