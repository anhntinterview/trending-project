import { Container, Service } from 'typedi';
import AuthService from '@/authentication/auth.service';
import { LoginBodyData } from './auth.module';

@Service()
class AuthController<T> {
  private authService = Container.get(AuthService<T>);

  login(bodyData: LoginBodyData) {
    this.authService.login(bodyData);
  }

  constructor() {}
}

export default AuthController;
