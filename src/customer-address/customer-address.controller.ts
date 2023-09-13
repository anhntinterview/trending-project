import { Container, Service } from 'typedi';
import CustomerAddressService from '@/customer-address/customer-address.service';

@Service()
class CustomerAddressController {
  private customerAddressService = Container.get(CustomerAddressService);
  constructor() {}
}

export default CustomerAddressController;