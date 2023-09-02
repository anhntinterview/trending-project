import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthController from '@/authentication/auth.controller';
import ApiOperationBase from '@/core/provider/api-operation.base';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CookieService from '@/core/cookie/cookies.service';
import CustomerService from '@/customer/customer.service';
import CustomerSessionService from '@/customer-session/customer-session.service';
import { Repository } from 'typeorm';
import { Customer } from '@db/entity/customer.entity';
import CustomerRepository from '@/customer/customer.repository';
import AuthMiddleware from './middleware/auth.middlware';

export type LoginBodyData = {
  email: string;
  password: string;
};

class AuthModule<T> extends ApiOperationBase<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private authController = Container.get(AuthController<T>);
  private authMiddlware = new AuthMiddleware<T>(this.req, this.res);

  async login() {
    await this.authMiddlware.login();
  }
}

export default AuthModule;
