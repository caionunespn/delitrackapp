import { IOrder } from "@/interfaces/IOrder";
import api from "@/services/api";
import axios from "axios";

export const getOrder = async (id: string): Promise<IOrder | undefined> => {
    try {
        const response = await api.get("/order");
        const orders: IOrder[] = response.data;

        const order = orders.filter(_order => _order.id === id)[0];
        return order;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status)
          console.error(error.response);
        } else {
          console.error(error);
        }
    }
}