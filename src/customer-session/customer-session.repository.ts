import { CustomerSession } from "@db/entity/customer-session.entity";
import { AppDataSource } from "@root/data-source";

const CustomerSessionRepository =  AppDataSource.getRepository(CustomerSession)

export default CustomerSessionRepository 