import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Trip, TripLocation } from "../constants/TripLocation";
import {
  deleteStorageValue,
  getStorageValue,
  setStorageValue,
} from "../constants/Storage";

type TripState = {
  saveLocalTrip: (trip: TripLocation[]) => Promise<void>;
  deleteLocalTrip: (tripIndex: string) => Promise<void>;
  trips: Trip[];
};

const TripContext = createContext<TripState | null>(null);

export function useTrip() {
  return useContext(TripContext);
}

async function loadLocalTrip(
  setMaxTripIndex: Dispatch<SetStateAction<string>>,
  setTrips: Dispatch<SetStateAction<Trip[]>>
) {
  let maxTripIndex = await getStorageValue("maxTripIndex");
  if (!maxTripIndex) {
    maxTripIndex = "0";
    await setStorageValue("maxTripIndex", maxTripIndex);
  }
  setMaxTripIndex(maxTripIndex);
  let tripsInStorage: Trip[] = [];
  for (let i = 0; i < +maxTripIndex; i++) {
    const tripInStorage = await getStorageValue(`${i}`);
    if (!tripInStorage) continue;
    tripsInStorage.push({ id: `${i}`, trip: JSON.parse(tripInStorage) });
  }
  setTrips(tripsInStorage);
}

async function saveLocalTrip(
  trip: TripLocation[],
  maxTripIndex: string,
  setMaxTripIndex: Dispatch<SetStateAction<string>>
): Promise<void> {
  try {
    await setStorageValue(maxTripIndex, JSON.stringify(trip));
    const newMaxTripIndex = `${+maxTripIndex + 1}`;
    await setStorageValue("maxTripIndex", newMaxTripIndex);
    setMaxTripIndex(newMaxTripIndex);

    console.log("save Trip");
  } catch (err) {
    console.error(err);
  }
}

async function deleteLocalTrip(tripIndex: string): Promise<void> {
  await deleteStorageValue(tripIndex);
}

export function TripsProvider(props: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [maxTripIndex, setMaxTripIndex] = useState<string>("0");

  useEffect(() => {
    loadLocalTrip(setMaxTripIndex, setTrips);
  }, []);
  return (
    <TripContext.Provider
      value={{
        saveLocalTrip: (trip: TripLocation[]) =>
          saveLocalTrip(trip, maxTripIndex, setMaxTripIndex),
        deleteLocalTrip,
        trips,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
}
