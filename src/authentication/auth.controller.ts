import { Container, Service } from 'typedi';
import AuthService from '@/authentication/auth.service';
import { RegisterBodyDataValidation } from '@/authentication/auth.type';
import { GetOneByAttribute } from '@root/type/entity/common';

@Service()
class AuthController<T> {
  private authService = Container.get(AuthService);

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

  constructor() {}
}

export default AuthController;
