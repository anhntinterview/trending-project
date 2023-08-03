import { CustomerAddress } from "@db/entity/customer-address.entity";
import { Repository } from "typeorm";

class CustomerAddressService {
    constructor(
        private customerAddressRepository: Repository<CustomerAddress>
    ) { }
    
    
    
}
export default CustomerAddressService