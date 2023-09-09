import { ICustomer } from "@root/type/entity/ICustomer";

export type CreateOneByCustomerIdBodyDataType = {
    customer: ICustomer, 
    timer: number,
    path: string
};

export type CustomerSessionValueAttrType = {
    customerId: string,
    currentTime: string,
    expiredDate: string,
    path: string,
}

export type DeleteCustomerSessionBodyDataType = { id: string }