import { Customer } from "@db/entity/customer.entity";
import { AppDataSource } from "@root/data-source";

const CustomerRepository =  AppDataSource.getRepository(Customer)

export default CustomerRepository 