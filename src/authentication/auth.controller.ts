import { Container, Service } from 'typedi';
import AuthService from '@/authentication/auth.service';
import { LoginBodyDataValidation, RegisterBodyDataValidation } from '@/authentication/auth.type';
import { GetOneByAttribute } from '@root/type/entity/common';

@Service()
class AuthController<T> {
  private authService = Container.get(AuthService<T>);

  async verifyEmail(email: string) {
    const bodyData: GetOneByAttribute = {
      nameAttr: 'email',
      valueAttr: email
    };
    await this.authService.verifyEmail(bodyData);
  }

  async register(bodyData: RegisterBodyDataValidation): Promise<T> {
    return await this.authService.register(bodyData);
  }

  async verifyEmailExist(customerId: string) {
    return await this.authService.verifyEmailExist(customerId);
  }

  constructor() {}
}

export default AuthController;
