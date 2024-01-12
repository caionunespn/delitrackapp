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

const mapStyles = [
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

export default function Map(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const openMap = (node: HTMLDivElement | null) => {
    if (node && !map) {
      setMap(new window.google.maps.Map(node, {
        center: props.defaultCenter,
        zoom: props.defaultZoom,
        zoomControl: false,
        disableDefaultUI: true,
        styles: mapStyles
      }));
    }
  }

  return (
    <MapWrapper>
      <div className="w-full h-[70vh] md:h-[60vh]">
        <div
          ref={(node) => {
            openMap(node);
          }}
          style={{width: '100%', height: '100%'}}
        />
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, { map });
          }
        })}
      </div>
    </MapWrapper>
  );
};