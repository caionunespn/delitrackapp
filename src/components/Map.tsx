import React, {useEffect, useRef, useState } from "react";
import MapWrapper from "./MapWrapper";

interface MapProps extends google.maps.MapOptions {
  children: React.ReactNode,
  defaultCenter: google.maps.LatLngLiteral;
  defaultZoom: number;
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

export default function Map(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: props.defaultCenter,
        zoom: props.defaultZoom,
        zoomControl: false,
        disableDefaultUI: true,
      }));
    }
  }, [ref, map]);

  return (
    <MapWrapper>
        <div
          ref={ref}
          style={props.style ? props.style : { width: "100%", height: "450px" }}
        />
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, { map });
          }
        })}
    </MapWrapper>
  );
};