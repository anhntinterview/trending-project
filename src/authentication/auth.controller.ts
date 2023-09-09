import { Container, Service } from 'typedi';
import AuthService from '@/authentication/auth.service';
import { RegisterBodyDataValidation } from '@/authentication/auth.type';
import { GetOneByAttribute } from '@root/type/entity/common';

@Service()
class AuthController<T> {
  private authService = Container.get(AuthService<T>);

  async activeAccount(email: string) {
    const bodyData: GetOneByAttribute = {
      nameAttr: 'email',
      valueAttr: email
    };
    await this.authService.activeAccount(bodyData);
  }

  async register(bodyData: RegisterBodyDataValidation): Promise<void> {
    return await this.authService.register(bodyData);
  }

  async verifyExistedEmail(email: string): Promise<boolean> {
    const bodyData: GetOneByAttribute = {
      nameAttr: 'email',
      valueAttr: email
    };
    return await this.authService.verifyExistedEmail(bodyData);
  }

  constructor() {}
}

export default AuthController;
