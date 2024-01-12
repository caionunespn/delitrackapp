import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import { IOrder } from "@/interfaces/IOrder";
import { IDriverPosition } from "@/interfaces/IDriver";
import OrderHubConnector from "@/services/order/signalr";
import * as OrderService from "@/services/order/order";
import { formatDate } from "@/utils/date";

const orderStatus = [
  "Seu pedido foi realizado", 
  "O restaurante confirmou seu pedido", 
  "O restaurante está preparando seu pedido", 
  "Motorista em rota de entrega", 
  "Pedido entregue", 
  "Pedido cancelado"
];

export default function Order() {
  const router = useRouter();
  const { joinRoom, leaveRoom, events, startCallback, finishConnection } = OrderHubConnector();
  
  const [order, setOrder] = useState<IOrder | undefined>();
  const [loading, setLoading] = useState(false);
  const [signalConnectionStatus, setSignalConnectionStatus] = useState<string | null>(null);
  const [driverPosition, setDriverPosition] = useState<IDriverPosition | undefined>();

  useEffect(() => {
    events((method, params) => {
      if (method === "UpdateDriverPosition") {
        setDriverNewPosition(params);
      }
    });
    startCallback(setSignalConnectionStatus);
  }, []);

  useEffect(() => {
    const id = router.query?.slug as string;
    if (id) {
      if (!order) getOrder(id);
      if (signalConnectionStatus === "Connected") joinRoom(id);
    }
  }, [router.query, signalConnectionStatus]);

  useEffect(() => () => cleanConnection(), []);

  useEffect(() => {
    if (!order) return;
    const driverPosition: IDriverPosition = {
      id: order.driver.id,
      currentPosLatitude: order.driver.currentPosLatitude,
      currentPosLongitude: order.driver.currentPosLongitude,
    };
    setDriverNewPosition(driverPosition);
  }, [order]);

  const setDriverNewPosition = (driverPosition: IDriverPosition) => {
    console.log(driverPosition);
    setDriverPosition(driverPosition);
  };

  const cleanConnection = () => {
    if (order) leaveRoom(order.id);
    if (signalConnectionStatus === "Connected") finishConnection();
  }

  const getOrder = async (id: string) => {
    setLoading(true);
    const order = await OrderService.getOrder(id);
    setOrder(order);
    setLoading(false);
  }

  return (
    <div className="flex flex-col justify-center w-full h-full ">
      {!order && loading && <p>LOADING</p>} 
      {!order && !loading && <p>THIS ORDER DOES NOT EXISTS</p>} 
      {order && !loading && (
        <>
          <div className="p-3 h-[30vh] md:h-[40vh]">
            <div className="flex items-center">
              <button className="mr-3 text-lg">{"<"}</button>
              <p className="text-md font-semibold">Detalhes do Pedido</p>
            </div>
            <div className="pl-6 mt-2">
              <div className="flex">
                <img className="w-10 h-10 rounded-full mr-3" src={"https://picsum.photos/200"} alt="restaraunt-image" />
                <div>
                  <p>{order.store.name}</p>
                  <p className="text-xs color-gray-500 mb-[16px]">Pedido feito na {formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div className="bg-gray-100 flex items-center justify-center h-[30px] rounded-2 mb-2">
                <p className="font-semibold color-green-100">{orderStatus[order.status - 1]}</p>
              </div>
              <p className="text-xs color-gray-500">Motorista da entrega:</p>
              <p>{order.driver?.name}</p>
              <p className="text-xs color-gray-500 mt-[4px]">Acompanhe o trajeto:</p>
            </div>
          </div>
          {order.status === 4 && order.driver.showPosition && driverPosition && (
            <Map
              defaultCenter={{
                lat: order.customer.currentPosLatitude,
                lng: order.customer.currentPosLongitude,
              }}
              defaultZoom={16}
            >
              <Marker
                title="customer-marker"
                position={{
                  lat: order.customer.currentPosLatitude,
                  lng: order.customer.currentPosLongitude,
                }}
              />
              <Marker
                title="driver-marker"
                position={{
                  lat: driverPosition.currentPosLatitude,
                  lng: driverPosition.currentPosLongitude,
                }}
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/3721/3721619.png",
                  scaledSize: {
                    width: 40,
                    height: 40,
                    equals: () => true,
                  },
                }}
              />
            </Map>
          )}
        </>
      )}
    </div>
  );
}