import axios from "axios";
import React from "react";

import { env } from "../config/env";

export async function getLocationImage(location: string) {
  try {
    console.log("getLocationImage", location);
    let photo_reference = [];
    let threePhoto_reference: string[] = [];
    let photos: string[] = [];
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: { query: location, key: env.GOOGLE_MAP_KEY },
      }
    );

    for (let x of res.data.results) {
      // console.log(x.photos[0].photo_reference);
      // threePhoto_reference.push(x.photos[0].photo_reference);
      photo_reference.push(x.photos[0].photo_reference);
    }
    // console.log(photo_reference);
    while (
      threePhoto_reference.length < 3 &&
      threePhoto_reference.length < photo_reference.length
    ) {
      const index = Math.floor(Math.random() * res.data.results.length);
      if (!threePhoto_reference.includes(photo_reference[index])) {
        threePhoto_reference.push(photo_reference[index]);
      }
    }
    for (let ref of threePhoto_reference) {
      let photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${env.GOOGLE_MAP_KEY}`;
      photos.push(photo);
    }
    // console.log(photos);
    return photos;
  } catch (err) {
    return [];
  }
}
