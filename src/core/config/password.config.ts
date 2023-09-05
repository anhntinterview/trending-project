import crypto from 'crypto';
import { Service } from 'typedi';

@Service()
class PasswordConfig {
  private _password: string;
  constructor() {}

  public set password(v: string) {
    this._password = v;
  }

  public get password(): string {
    return this._password;
  }

  public genPassword() {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(this.password, salt, 10000, 64, 'sha512').toString('hex');

    return {
      salt: salt,
      hash: genHash
    };
  }

  public validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
  }
}

export default PasswordConfig;
