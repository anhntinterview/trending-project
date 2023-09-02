import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, SuccessResponse } from '@/core/provider/api-operation.abstract';
import CookieBase from './cookie.base';
import Container, { Service } from 'typedi';
import CustomerSessionModule from '@/customer-session/customer-session.module';

@Service()
class CookieService<T, D> extends CookieBase<T, D> {
  constructor(req: NextApiRequest, res: NextApiResponse<SuccessResponse<T> | ErrorResponse>) {
    super(req, res);
  }

  public setSessionClientSide(data: D, timer: number) {
    this.setCookie(this.res, data, timer);
    this.res.status(200).send({ message: 'cookies was set succeed!' });
  }
}

export default CookieService;
