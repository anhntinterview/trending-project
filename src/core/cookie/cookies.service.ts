import { NextApiRequest, NextApiResponse } from 'next';
import CookieBase from './cookie.base';
import { Service } from 'typedi';

@Service()
class CookieService extends CookieBase {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  public setSessionClientSide(data, timer: number, path: string) {
    this.setCookie(this.res, data, timer, path);
    this.res.status(200).send({ message: 'cookies was set succeed!' });
  }
}

export default CookieService;
