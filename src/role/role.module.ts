import { NextApiRequest, NextApiResponse } from 'next';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CRUDModule from '@/core/service/crud/crud.module';
import CRUDMiddleware from '@/core/service/crud/crud.middleware';
import RoleRepository from '@/role/role.repository';
import CustomerRepository from '@/customer/customer.repository';
import { CustomeObjectLiteral } from '@root/type/entity/common';
import { Role } from '@db/entity/role.entity';
import { RoleBodyDataValidation } from '@/role//role.type';

class RoleModule<Role extends CustomeObjectLiteral, Customer extends CustomeObjectLiteral> extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  public crudModule = new CRUDModule<Role, Customer>(this.req, this.res, RoleRepository, CustomerRepository, 'role', 'customers');
  public crudMiddleware = new CRUDMiddleware<Role, Customer>(
    this.req,
    this.res,
    RoleRepository,
    CustomerRepository,
    'role',
    'customers'
  );

  async createOne() {
    return await this.crudMiddleware.createOne(new RoleBodyDataValidation(), new Role());
  }
}

export default RoleModule;
