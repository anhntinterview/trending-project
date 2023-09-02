import { ICustomer } from "@/util/entity/ICustomer";

export type CreateOneByCustomerIdBodyDataType = { sessionName:string, customer: ICustomer, timer: number };

export type DeleteCustomerSessionBodyDataType = { id: string }