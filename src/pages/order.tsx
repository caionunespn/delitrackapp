import { useState, useEffect } from "react";
import Map from "@/components/Map";
import Marker from "@/components/Marker";

let driverPositionQueue = [
  {
    id: "6bde5af8-bcf4-4cd8-8e8e-f27f4f75bdb7",
    "currentPosLatitude": -3.8014703,
    "currentPosLongitude": -38.5348828,
  },
  {
    id: "6bde5af8-bcf4-4cd8-8e8e-f27f4f75bdb7",
    "currentPosLatitude": -3.8083192,
    "currentPosLongitude": -38.5242426,
  },
  {
    id: "6bde5af8-bcf4-4cd8-8e8e-f27f4f75bdb7",
    "currentPosLatitude": -3.8094624,
    "currentPosLongitude": -38.5238157,
  },
]

export default function Order() {
  const order = {
    "id": "c7d5e3bc-3a75-4bdf-b125-6a85b2a06b00",
    "store": {
      "id": "6767ae4b-47b8-4d4e-9cf0-320852ed2931",
      "name": "M&E Doces e Salgados",
      "address": "Rua Ataia, 842",
      "city": "São Paulo",
      "state": "São Paulo",
      "postalCode": "03086045",
      "country": "Brasil",
      "phone": "119910002930"
    },
    "customer": {
      "id": "cbd3f20c-1894-4afa-bb08-5b607a1e7c60",
      "email": "customer@email.com",
      "name": "Caio Nunes",
      "currentPosLatitude": -3.8013275,
      "currentPosLongitude": -38.5363543
    },
    "driver": {
      "id": "6bde5af8-bcf4-4cd8-8e8e-f27f4f75bdb7",
      "email": "driver@email.com",
      "name": "Driver for DeliTrack",
      "showPosition": true,
      "currentPosLatitude": -3.8057686,
      "currentPosLongitude": -38.5284509
    },
    "status": 4
  };
  const [driverPosition, setDriverPosition] = useState<any>(null);

  useEffect(() => {
    setDriverPosition({
      currentPosLatitude: order.driver.currentPosLatitude,
      currentPosLongitude: order.driver.currentPosLongitude,
    });

    setInterval()
  }, [order]);

  return (
    <div className="flex justify-center items-center w-full h-full ">
      {order.status === 4 && order.driver.showPosition && driverPosition && (
        <Map
          defaultCenter={{
            lat: order.customer.currentPosLatitude,
            lng: order.customer.currentPosLongitude,
          }}
          defaultZoom={16}
        >
          <Marker
            position={{
              lat: order.customer.currentPosLatitude,
              lng: order.customer.currentPosLongitude,
            }}
          />
          <Marker
            position={{
              lat: driverPosition.currentPosLatitude,
              lng: driverPosition.currentPosLongitude,
            }}
          />
        </Map>
      )}
    </div>
  );
}