import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import { RoleBodyDataValidation } from './role.type';
import { Role } from '@db/entity/role.entity';
import ApiProvider from '@/core/provider/singleton/api.provider';
import RoleRepository from '@/role/role.repository';
import CustomerRepository from '@/customer/customer.repository';
import CRUDService from '@/core/service/crud/crud.service';
import { APIMethodType } from '@root/type/entity/common';

@Service()
class RoleMiddleware extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
  private crudService = new CRUDService(RoleRepository, CustomerRepository, 'role', 'customers');

  async isExistedRole(name: string) {
    const isExistedRole = await this.crudService.findOneByAttribute({ nameAttr: 'name', valueAttr: name });
    return isExistedRole ? true : false;
  }

  async roleValidate(checkExist: boolean, bodyData: RoleBodyDataValidation, callback: () => Promise<unknown>) {
    const validateBodyData = new RoleBodyDataValidation();
    const { name } = bodyData;

    if (checkExist) {
      const isExist = await this.isExistedRole(name);
      if (isExist) {
        this.errorResponse = { error: 'Role title was existed' };
        return this.sendErrorResponse();
      }
    }
    for (const key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        validateBodyData[key] = bodyData[key];
      } else {
        this.errorResponse = { error: `${key} key is not exist in bodyData` };
        return this.sendErrorResponse();
      }
    }

    const errors = await validate(validateBodyData);
    if (errors.length > 0) {
      errors.map((err) => {
        this.errorResponse = err.constraints;
        return this.sendErrorResponse();
      });
    } else {
      return callback();
    }
  }

  async createOne() {
    return await this.handleBodyDataResponse(
      APIMethodType.POST, // method
      async (bodyData: RoleBodyDataValidation) => {
        await this.roleValidate(
          true, // checkExist
          bodyData,
          async () => {
            const newRole = new Role();
            for (const key in bodyData) {
              if (bodyData.hasOwnProperty(key)) {
                newRole[key] = bodyData[key];
              } else {
                this.errorResponse = { error: `${key} key is not exist in bodyData` };
                return this.sendErrorResponse();
              }
            }
            return await this.crudService.createOne(newRole);
          }
        );
      }
    );
  }
}

export default RoleMiddleware;
