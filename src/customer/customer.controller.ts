import { CustomersDTO } from "./customer.dto";
import CustomerService from "./customer.service";
import { Container } from "typedi";

class CustomerController {
    private customerService = Container.get(CustomerService)

    constructor() {}

    async all(): Promise<CustomersDTO> {
        return await this.customerService.all()
    }
}

export default CustomerController