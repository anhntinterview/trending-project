import { CustomerAddress } from '@db/entity/customer-address.entity';

export interface CustomerAddresesDTO {
  list: Array<CustomerAddress>;
  count: number;
}

export interface CustomerAddressRO {
  customerAddress: CustomerAddress;
}
