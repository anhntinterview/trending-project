import { NextApiRequest, NextApiResponse } from 'next';
import Container from 'typedi';
import jwt from 'jsonwebtoken';
import CustomerService from '@/customer/customer.service';
import MethodProvider from '@/core/provider/method.provider';
import PasswordConfig from '@/core/config/password.config';
import { LoginBodyDataValidation } from '@/authentication/auth.type';
import ApiProvider from '@/core/provider/singleton/api.provider';
import SecurityConfig from '@/core/config/security.config';
import CustomerSessionService from '@/customer-session/customer-session.service';
import {
  CreateOneByCustomerIdBodyDataType,
  CustomerSessionValueAttrType
} from '@/customer-session/customer-session.type';
import moment from 'moment';
import CustomerRepository from '@/customer/customer.repository';

export type JwtVerifyType = {
  sub: string;
  iat: number;
  exp: number;
};

class AuthMiddleware<T> extends ApiProvider<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  protected readonly methodProvider = new MethodProvider<T>(this.req, this.res);
  private passwordConfig = Container.get(PasswordConfig);
  private securityConfig = Container.get(SecurityConfig<T>);
  private customerService = Container.get(CustomerService<T>);

  public async login() {
    await this.handleBodyDataResponse(
      'post',
      async (bodyData: LoginBodyDataValidation) => {
        const { email, password } = bodyData;
        const customer = await this.customerService.findOneByAttribute({ nameAttr: 'email', valueAttr: email });
        if (customer) {
          const isValid = this.passwordConfig.validPassword(password, customer.hash, customer.salt);
          const isActive = await this.securityConfig.isActive(email);
          if (isActive) {
            if (isValid) {
              const tokenObject = await this.securityConfig.issueJWT(customer);
              if (tokenObject) {
                this.sendSuccessResponse(undefined, {
                  success: true,
                  token: tokenObject.token,
                  expiresIn: tokenObject.expires
                });
              }
            } else {
              this.sendErrorResponse({ success: false, msg: 'you entered the wrong password' });
            }
          } else {
            this.sendErrorResponse({ success: false, msg: 'your account is not actived' });
          }
        } else {
          this.sendErrorResponse({ error: 'customer was not defined' });
        }
      },
      true // isValidate
    );
  }

  public async verifyJWT(callback: () => Promise<T>) {
    const tokenParts = this.req.headers.authorization?.split(' ');
    const PUB_KEY = await this.securityConfig.publicKey();
    if (tokenParts) {
      if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
        try {
          const verification: JwtVerifyType = jwt.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });

          // *** START Handle ExpiredTime
          const { sub, exp, iat } = verification;
          const currentTimestamp = new Date().getTime();
          console.log(`exp: `, exp);
          console.log(`current`, currentTimestamp);
          console.log(`iat: `, iat);
          console.log(`exp > current`, exp > currentTimestamp);
          if (exp > currentTimestamp) {
            try {
              await this.restartDBConnection();
              const customer = await this.customerService.findOne(sub);
              if (customer) {
                callback();
              } else {
                return this.sendErrorResponse({ success: false, msg: 'Customer is not existed' });
              }
            } catch (error) {
              return this.sendErrorResponse({ success: false, error });
            }
          } else {
            return this.sendErrorResponse({ success: false, msg: 'Token was expired. Please login again' });
          }
          // *** END Handle ExpiredTime
        } catch (err) {
          return this.sendErrorResponse({ success: false, msg: 'You are not authorized to visit this route' });
        }
      } else {
        return this.sendErrorResponse({ success: false, msg: 'You are not authorized to visit this route' });
      }
    } else {
      return this.sendErrorResponse({ success: false, msg: 'You are not authorized to visit this route' });
    }
  }
}

export default AuthMiddleware;
