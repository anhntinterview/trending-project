import Container, { Service } from 'typedi';
import { RegisterBodyDataValidation } from '@/authentication/auth.type';
import CustomerService from '@/customer/customer.service';
import { Customer } from '@db/entity/customer.entity';
import PasswordConfig from '@/core/config/password.config';
import EmailService from '@/core/service/email.service';
import { GetOneByAttribute } from '@root/type/entity/common';
@Service()
class AuthService<T> {
  constructor() {}

  private customerService = Container.get(CustomerService<T>);
  private passwordConfig = Container.get(PasswordConfig);
  private emailService = Container.get(EmailService);

  async verifyEmail(bodyData: GetOneByAttribute) {
    const updateCustomer = await this.customerService.findOneByAttribute(bodyData);
    if (updateCustomer) {
      updateCustomer.active = true;
      await this.customerService.updateOne(updateCustomer);
    }
  }

  async register(bodyData: RegisterBodyDataValidation) {
    const { password } = bodyData;
    const newCustomer = new Customer();
    this.passwordConfig.password = password;
    const saltHash = this.passwordConfig.genPassword();

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    newCustomer.username = bodyData.username || '';
    newCustomer.first_name = bodyData.first_name || '';
    newCustomer.last_name = bodyData.last_name || '';
    newCustomer.phone_number = bodyData.phone_number;
    newCustomer.email = bodyData.email;
    newCustomer.hash = hash;
    newCustomer.salt = salt;
    newCustomer.active = bodyData.active;
    newCustomer.addresses = bodyData.addresses ? bodyData.addresses : [];
    newCustomer.first_name = bodyData.first_name || '';

    return await this.customerService.createOne(newCustomer).then(() => {
      this.emailService.sendEmail(
        'tuananh.nguyen.macpro@gmail.com',
        'Welcome to FreedomWalking Online',
        `Please click to the link to active your account:
        http://${process.env.DOMAIN}:${process.env.HOST_PORT}/api/auth/verify-email?param=${newCustomer.email}
        `
      );
    });
  }

  async verifyEmailExist(customerId: string) {
    const customer = await this.customerService.findOne(customerId);
    return customer ? true : false;
  }

  logout() {}
}

export default AuthService;
