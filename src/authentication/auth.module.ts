import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthController from '@/authentication/auth.controller';
import AuthMiddleware from './auth.middleware';
import ApiProvider from '@/core/provider/singleton/api.provider';
import { RegisterBodyDataValidation } from '@/authentication/auth.type';

class AuthModule<T> extends ApiProvider<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private authController = Container.get(AuthController<T>);
  private authMiddleware = new AuthMiddleware<T>(this.req, this.res);

  async login() {
    await this.authMiddleware.login();
  }

  async register() {
    await this.handleBodyDataResponse(
      'post',
      (bodyData: RegisterBodyDataValidation) => this.authController.register(bodyData),
      true
    );
  }

  async isAuth(callback: () => Promise<T>) {
    await this.authMiddleware.verifyJWT(callback);
  }

  async verifyEmail() {
    await this.handleUrlParamResponse(
      'get',
      (email: string) => this.authController.verifyEmail(email)
    )
  }
}

export default AuthModule;
