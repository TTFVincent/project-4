import { Box, CheckIcon, HStack, Select, Text } from "native-base";
import { colour_label_text } from "../css/colors";
import { useState } from "react";

export type SetDate = {
    setdate: Function
}
  

export function Select_date({ setdate }: SetDate) {
    // const {setdate} = props
  let dayList = [];
  for (let d = 1; d <= 31; d++) {
    dayList.push(d);
  }
  let monthList = [];
  for (let m = 1; m <= 12; m++) {
    monthList.push(m);
  }
  const now = new Date();
  const year = now.getFullYear();
  let yearList = [];
  for (let y = year; y >= 1900; y--) {
    yearList.push(y);
  }

  return (
    <Box>
      <Text color={colour_label_text}>Date of birth</Text>
      <HStack>
        <Box width={"50%"}>
          <Select
            minWidth="47%"
            mr="6%"
            accessibilityLabel="Choose Service"
            placeholder="date"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1} onValueChange={itemValue => setdate( (v:any) => ({...v, day: itemValue}))}>
            {dayList.map((e) => (
              <Select.Item key={e} label={`${e}`} value={`${e}`} />
            ))}
          </Select>
        </Box>
        <Box width={"50%"}>
          <Select
            minWidth="47%"
            ml="6%"
            accessibilityLabel="Choose Service"
            placeholder="month"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1} onValueChange={itemValue => setdate( (v:any) => ({...v, month: itemValue}))}
          >
            {monthList.map((e) => (
              <Select.Item key={e} label={`${e}`} value={`${e}`} />
            ))}
          </Select>
        </Box>
      </HStack>
      <Box>
        <Select
          isFocusVisible
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="year"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1} onValueChange={itemValue => setdate( (v:any) => ({...v, year: itemValue}))}
        >
          {yearList.map((e) => (
            <Select.Item key={e} label={`${e}`} value={`${e}`} />
          ))}
        </Select>
      </Box>
    </Box>
  );
}
