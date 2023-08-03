import { CustomerAddress } from "@db/entity/customer-address.entity";
import { AppDataSource } from "@root/data-source";

const CustomerAddressRepository =  AppDataSource.getRepository(CustomerAddress)

export default CustomerAddressRepository 