import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import cookie from 'cookie';
import ApiOperationBase from '@/core/provider/api-operation.base';
import { ErrorResponse, SuccessResponse } from '@/core/provider/api-operation.abstract';
import { COOKIE_NAME } from './cookie-name.type';

class CookieBase extends ApiOperationBase {
  private sessionSecret = process.env.SESSION_SECRET;
  private IVLength = 16;

  private _sessionName;

  get sessionName(): COOKIE_NAME | string {
    return this._sessionName;
  }

  set sessionName(v: COOKIE_NAME | string) {
    this._sessionName = v;
  }

  public generateRandomToken() {
    return crypto.randomBytes(16).toString('hex');
  }

  protected encrypt(data: string) {
    const iv = crypto.randomBytes(this.IVLength);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.sessionSecret as string), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  protected decrypt(data) {
    const parts = data.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.sessionSecret as string), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  protected setCookie(res: NextApiResponse, data, timer: number, path: string) {
    const encryptedData = this.encrypt(JSON.stringify(data));
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(`session:${this.sessionName}`, encryptedData, { httpOnly: true, maxAge: timer, path })
    );
  }

  protected getCookie(req: NextApiRequest) {
    const encryptedData = req.cookies[this.sessionName];
    if (encryptedData) {
      return JSON.parse(this.decrypt(encryptedData));
    }
    return null;
  }

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
}

export default CookieBase;
