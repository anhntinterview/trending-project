import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthController from '@/authentication/auth.controller';
import AuthMiddleware from './auth.middleware';
import ApiProvider from '@/core/provider/singleton/api.provider';
import { RegisterBodyDataValidation } from '@/authentication/auth.type';
import { validate } from 'class-validator';

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
      async (bodyData: RegisterBodyDataValidation) => {
        const validateBodyData = new RegisterBodyDataValidation();
        const { username, first_name, last_name, phone_number, active, addresses, email, password } = bodyData;
        const isEmailExisted = await this.authController.verifyExistedEmail(email);
        validateBodyData.username = username;
        validateBodyData.first_name = first_name;
        validateBodyData.last_name = last_name;
        validateBodyData.phone_number = phone_number;
        validateBodyData.active = active;
        validateBodyData.addresses = addresses;
        validateBodyData.password = password;
        validateBodyData.email = email;
        const singleRecordErrors = await validate(validateBodyData);
        if (singleRecordErrors.length > 0) {
          return this.sendErrorResponse({
            error: singleRecordErrors.map((err) => err.constraints)
          });
        } else {
          if (isEmailExisted) {
            this.sendErrorResponse({ error: 'Email was existed' });
          } else {
            await this.authController.register(bodyData);
            this.sendSuccessResponse(undefined, {
              msg: 'The account was created successfully. Please access email and follow the instructions'
            });
          }
        }
      },
      true
    );
  }

  async isAuth(callback: () => Promise<T>) {
    await this.authMiddleware.verifyJWT(callback);
  }

  async activeAccount() {
    await this.handleUrlParamResponse('get', (email: string) => this.authController.activeAccount(email));
  }
}

export default AuthModule;
