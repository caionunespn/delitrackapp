import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MapWrapper({ children, }: { children: React.ReactNode; }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return <Wrapper apiKey={apiKey} render={render}>{children}</Wrapper>;
};