import { IBaseEntity } from "./IBaseEntity";
import { ICustomer } from "./ICustomer";
import { IDriver } from "./IDriver";
import { IStore } from "./IStore";

export interface IOrder extends IBaseEntity {
    id: string;
    store: IStore,
    customer: ICustomer,
    driver: IDriver,
    status: number,
}