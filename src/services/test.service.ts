import { Repository } from 'typeorm';
import { Customer } from '@db/entity/customer.entity';

export class TestService {
    constructor(
        private customerRespository: Repository<Customer>
    ) {
        
    }

    async getAllCustomer(): Promise<Array<Customer>> {
        return this.customerRespository.find();
    }
}
