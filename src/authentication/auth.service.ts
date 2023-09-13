import Container, { Service } from 'typedi';
import { RegisterBodyDataValidation } from '@/authentication/auth.type';
import { Customer } from '@db/entity/customer.entity';
import PasswordConfig from '@/core/config/password.config';
import EmailService from '@/core/service/email.service';
import { GetOneByAttribute } from '@root/type/entity/common';
import CRUDService from '@/core/service/crud/crud.service';
import CustomerRepository from '@/customer/customer.repository';
import CustomerAddressRepository from '@/customer-address/customer-address.repository';

@Service()
class AuthService {
  constructor() {}

  private crudService = new CRUDService(CustomerRepository, CustomerAddressRepository, 'customer', 'addresses');
  private passwordConfig = Container.get(PasswordConfig);
  private emailService = Container.get(EmailService);

  async activeAccount(bodyData: GetOneByAttribute) {
    const updateCustomer = await this.crudService.findOneByAttribute(bodyData);
    if (updateCustomer) {
      updateCustomer.active = true;
      await this.crudService.updateOne(updateCustomer);
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
    newCustomer.roles = bodyData.roles ? bodyData.roles : [];
    newCustomer.first_name = bodyData.first_name || '';

    const hiddenPassword = password[0] + '*'.repeat(password.length - 2) + password.slice(-1);

    return await this.crudService.createOne(newCustomer).then(() => {
      this.emailService.sendEmail(
        bodyData.email,
        // 'tuananh.nguyen.macpro@gmail.com',
        'Welcome to FreedomWalking Online',
        `Your account information:
        USERNAME: ${bodyData.username}
        PASSWORD: ${hiddenPassword}
        Please click to the link to active your account:
        http://${process.env.DOMAIN}:${process.env.HOST_PORT}/api/auth/active-account?param=${newCustomer.email}
        `
      );
    });
  }
}

export default AuthService;

// @Service()
// class AuthService<T> {
//   constructor() {}

//   private customerService = Container.get(CustomerService<T>);
//   private passwordConfig = Container.get(PasswordConfig);
//   private emailService = Container.get(EmailService);

//   async activeAccount(bodyData: GetOneByAttribute) {
//     const updateCustomer = await this.customerService.findOneByAttribute(bodyData);
//     if (updateCustomer) {
//       updateCustomer.active = true;
//       await this.customerService.updateOne(updateCustomer);
//     }
//   }

//   async register(bodyData: RegisterBodyDataValidation) {
//     const { password } = bodyData;
//     const newCustomer = new Customer();
//     this.passwordConfig.password = password;
//     const saltHash = this.passwordConfig.genPassword();

//     const salt = saltHash.salt;
//     const hash = saltHash.hash;

//     newCustomer.username = bodyData.username || '';
//     newCustomer.first_name = bodyData.first_name || '';
//     newCustomer.last_name = bodyData.last_name || '';
//     newCustomer.phone_number = bodyData.phone_number;
//     newCustomer.email = bodyData.email;
//     newCustomer.hash = hash;
//     newCustomer.salt = salt;
//     newCustomer.active = bodyData.active;
//     newCustomer.addresses = bodyData.addresses ? bodyData.addresses : [];
//     newCustomer.roles = bodyData.roles ? bodyData.roles : [];
//     newCustomer.first_name = bodyData.first_name || '';

//     const hiddenPassword = password[0] + "*".repeat(password.length - 2) + password.slice(-1)

//     return await this.customerService.createOne(newCustomer).then(() => {
//       this.emailService.sendEmail(
//         bodyData.email,
//         // 'tuananh.nguyen.macpro@gmail.com',
//         'Welcome to FreedomWalking Online',
//         `Your account information:
//         USERNAME: ${bodyData.username}
//         PASSWORD: ${hiddenPassword}
//         Please click to the link to active your account:
//         http://${process.env.DOMAIN}:${process.env.HOST_PORT}/api/auth/active-account?param=${newCustomer.email}
//         `
//       );
//     });
//   }

//   async verifyExistedEmail(bodyData: GetOneByAttribute) {
//     const customer = await this.customerService.findOneByAttribute(bodyData);
//     return customer ? true : false;
//   }
// }

// export default AuthService;
