import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Trip } from "../constants/TripLocation";
import { deleteValue, getValueFor, saveValue } from "../constants/Storage";

type TripState = {
  saveLocalTrip: (trip: Trip) => Promise<void>;
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
  let maxTripIndex = await getValueFor("maxTripIndex");
  if (!maxTripIndex) {
    maxTripIndex = "0";
    await saveValue("maxTripIndex", maxTripIndex);
  }
  setMaxTripIndex(maxTripIndex);
  let tripsInStorage: Trip[] = [];
  for (let i = 0; i < +maxTripIndex; i++) {
    const tripInStorage = await getValueFor(`${i}`);
    if (!tripInStorage) continue;
    tripsInStorage.push(JSON.parse(tripInStorage));
  }
  setTrips(tripsInStorage);
}

async function saveLocalTrip(
  trip: Trip,
  maxTripIndex: string,
  setMaxTripIndex: Dispatch<SetStateAction<string>>
): Promise<void> {
  try {
    await saveValue(maxTripIndex, JSON.stringify(trip));
    const newMaxTripIndex = `${+maxTripIndex + 1}`;
    await saveValue("maxTripIndex", newMaxTripIndex);
    setMaxTripIndex(newMaxTripIndex);
  } catch (err) {}
}

async function deleteLocalTrip(tripIndex: string): Promise<void> {
  await deleteValue(tripIndex);
}

export function Provider(props: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [maxTripIndex, setMaxTripIndex] = useState<string>("0");

  useEffect(() => {
    loadLocalTrip(setMaxTripIndex, setTrips);
  }, []);
  return (
    <TripContext.Provider
      value={{
        saveLocalTrip: (trip: Trip) =>
          saveLocalTrip(trip, maxTripIndex, setMaxTripIndex),
        deleteLocalTrip,
        trips,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
}