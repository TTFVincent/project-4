import React, { useState } from "react";
import { NativeBaseProvider, Center, Button, Text } from "native-base";

export default function tripGeneratePage() {
  const [result, setResult] = useState<string>("");

  async function fetchResult() {
    setResult("loading...");
    const res = await fetch("http://13.54.234.151/gpt", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        input:
          'Give a 1 day trip plan suggestion starting from 14:00 in hong kong with budget of $1000. The resulting JSON object should be in this format: [{"location":,"latitude":,"longitude":,"from_time":,"to_time":,"budget":},]. The JSON object:',
      }), // body data type must match "Content-Type" header
    });
    const text = await res.json();
    console.log(text[0]);
  }
  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Button onPress={fetchResult}>hi</Button>
      </Center>
      <Center flex={1} bg="indigo.700">
        <Text>{result}</Text>
      </Center>
    </NativeBaseProvider>
  );
}
