import React from "react";
import WeekView from "react-native-week-view";

const myEvents = [
  {
    id: 1,
    startDate: new Date(2023, 1, 20, 9),
    endDate: new Date(2023, 1, 20, 11),
    color: "blue",
    description: "E1",
    // ... more properties if needed,
  },
  {
    id: 2,
    startDate: new Date(2023, 1, 22, 10),
    endDate: new Date(2023, 1, 22, 11, 30),
    color: "red",
    description: "E2",
  },
  // More events...
];

export default function calendar() {
  return (
    <WeekView
      events={myEvents}
      selectedDate={new Date(2023, 1, 20, 12)}
      numberOfDays={7}
      pageStartAt={{ weekday: 1 }}
    />
  );
}
