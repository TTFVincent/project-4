export type TripLocation = {
  id: string;
  location: string;
  location_address: string;
  latitude: string;
  longitude: string;
  from_time: string;
  to_time: string;
  budget: string;
};

export const sampleTrip: TripLocation[] = [
  {
    id: "1",
    location: "The Peak",
    location_address: "Victoria Peak, Central and Western District, Hong Kong",
    latitude: "22.2758",
    longitude: "114.1455",
    from_time: "1000",
    to_time: "1200",
    budget: "65",
  },
  {
    id: "2",
    location: "Hong Kong Museum of Art",
    location_address: "10 Salisbury Rd, Tsim Sha Tsui, Hong Kong",
    latitude: "22.2948",
    longitude: "114.1713",
    from_time: "1300",
    to_time: "1500",
    budget: "10",
  },
  {
    id: "3",
    location: "Giacomo Ristorante Italiano",
    location_address:
      "Shop 1, G/F Heung Hoi Mansion, 26 Soy Street, Mong Kok, Hong Kong",
    latitude: "22.3176",
    longitude: "114.1703",
    from_time: "1800",
    to_time: "2000",
    budget: "250",
  },
  {
    id: "4",
    location: "Ladies' Market",
    location_address: "Tung Choi St, Mong Kok, Hong Kong",
    latitude: "22.3192",
    longitude: "114.1698",
    from_time: "2100",
    to_time: "2300",
    budget: "30",
  },
];
