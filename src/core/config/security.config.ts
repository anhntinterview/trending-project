import jwt from 'jsonwebtoken';
import path from 'path';
import { promises as fs } from 'fs';
import { Customer } from '@db/entity/customer.entity';
import Container, { Service } from 'typedi';
import { GetOneByAttribute } from '@root/type/entity/common';
import CRUDService from '../service/crud/crud.service';

// List security technical includes:
// 1. Crypto keyPair
// 2. jsonwebtoken

export type JwtPayloadType = {
  sub: string;
  iat: Date;
};

@Service()
class SecurityConfig<T> {
  private fileDirectory;
  constructor() {
    this.fileDirectory = path.join(process.cwd());
  }

  private crudService = Container.get(CRUDService);

  async privateKey() {
    return await fs.readFile(this.fileDirectory + '/id_rsa_priv.pem', 'utf8');
  }

  async publicKey() {
    return await fs.readFile(this.fileDirectory + '/id_rsa_pub.pem', 'utf8');
  }

  public async issueJWT(customer: Customer) {
    const PRIV_KEY = await this.privateKey();
    const _id = customer.id;

    const expiresIn = '1d';

    const payload = {
      sub: _id,
      iat: Date.now()
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
      token: 'Bearer ' + signedToken,
      expires: expiresIn
    };
  }

  public async isActive(email: string): Promise<boolean> {
    const bodyData: GetOneByAttribute = {
      nameAttr: 'email',
      valueAttr: email
    };

    const customer = await this.crudService.findOneByAttribute(bodyData);
    if (customer?.active) {
      return true;
    } else {
      return false;
    }
  }
}

export default SecurityConfig;
