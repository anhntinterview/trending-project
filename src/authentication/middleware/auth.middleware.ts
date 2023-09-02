import { NextApiRequest, NextApiResponse } from 'next';
import Container from 'typedi';
import CustomerService from '@/customer/customer.service';
import CookieService from '@/core/cookie/cookies.service';
import CustomerSessionService from '@/customer-session/customer-session.service';
import ApiOperationProvider from '@/core/provider/api-operation.provider';
import MethodProvider from '@/core/provider/method.provider';
import { IsEmail, IsNotEmpty, validate } from 'class-validator';

export class LoginBodyData {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

class AuthMiddleware<T> extends ApiOperationProvider<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  protected readonly methodProvider = new MethodProvider<T>(this.req, this.res);
  protected readonly cookieService = new CookieService(this.req, this.res);
  private customerService = Container.get(CustomerService<T>);
  private customerSessionService = Container.get(CustomerSessionService<T>);

  public async login() {
    const { bodyData } = this.req.body;

    if (bodyData) {
      const bodyDataErrors = await validate(bodyData as LoginBodyData);
      if (bodyDataErrors.length > 0) {
        return this.sendErrorResponse({
          error: bodyDataErrors.map((err) => err.constraints)
        });
      } else {
        await this.methodProvider.post(() =>
          this.execute(async () => {
            const { email, password } = bodyData;
            const customer = await this.customerService.findOneByAttribute({ nameAttr: 'email', valueAttr: email });
            if (customer) {
              this.cookieService.sessionName = this.cookieService.generateRandomToken();
              // Using at Client Side
              // this.cookieService.setSessionClientSide(id, 3600);
              await this.customerSessionService.createOneByCustomerId({
                sessionName: this.cookieService.sessionName,
                customer,
                timer: 3600
              });
            } else {
              this.sendErrorResponse({ error: 'customer was not defined' });
            }
          })
        );
      }
    } else {
      return this.sendErrorResponse({ error: 'bodyData was not defined' });
    }
  }
}

export default AuthMiddleware;
