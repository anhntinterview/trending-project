import { NextApiRequest, NextApiResponse } from 'next';
import AuthMiddleware from './auth.middleware';
import ApiProvider from '@/core/provider/singleton/api.provider';

class AuthModule<T> extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse<T>) {
    super(req, res);
  }

  private authMiddleware = new AuthMiddleware(this.req, this.res);

  async login() {
    await this.authMiddleware.login();
  }

  async register() {
    await this.authMiddleware.register();
  }

  async isAuth(callback: () => Promise<T>) {
    await this.authMiddleware.verifyJWT(callback);
  }

  async activeAccount() {
    await this.authMiddleware.activeAccount();
  }
}

export default AuthModule;
