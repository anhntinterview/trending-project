import Container, { Service } from 'typedi';
import { LoginBodyData } from './auth.module';

@Service()
class AuthService<T> {
  constructor() {}


  
  register() {}

  verifyEmail() {}

  login(bodyData: LoginBodyData) {
    
  }

  logout() {}
}

export default AuthService;
