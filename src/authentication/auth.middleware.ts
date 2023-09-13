import { NextApiRequest, NextApiResponse } from 'next';
import Container from 'typedi';
import jwt from 'jsonwebtoken';
import PasswordConfig from '@/core/config/password.config';
import { JwtVerifyType, LoginBodyDataValidation, RegisterBodyDataValidation } from '@/authentication/auth.type';
import ApiProvider from '@/core/provider/singleton/api.provider';
import SecurityConfig from '@/core/config/security.config';
import { validate } from 'class-validator';
import AuthController from './auth.controller';
import CRUDService from '@/core/service/crud/crud.service';
import CustomerRepository from '@/customer/customer.repository';
import CustomerAddressRepository from '@/customer-address/customer-address.repository';
import { Customer } from '@db/entity/customer.entity';
import { APIMethodType } from '@root/type/entity/common';

class AuthMiddleware extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  private crudService = new CRUDService(CustomerRepository, CustomerAddressRepository, 'customer', 'addresses');
  private passwordConfig = Container.get(PasswordConfig);
  private securityConfig = Container.get(SecurityConfig);
  private authController = Container.get(AuthController);

  public async register() {
    await this.handleBodyDataResponse(APIMethodType.POST, async (bodyData: RegisterBodyDataValidation) => {
      const validateBodyData = new RegisterBodyDataValidation();
      const { email } = bodyData;
      const customer = await this.crudService.findOneByAttribute({
        nameAttr: 'email',
        valueAttr: email
      });
      const isEmailExisted = customer ? true : false;
      for (const key in bodyData) {
        if (bodyData.hasOwnProperty(key)) {
          validateBodyData[key] = bodyData[key];
        } else {
          this.errorResponse = { error: `${key} key is not exist in bodyData` };
          return this.sendErrorResponse();
        }
      }
      // validateBodyData.username = username;
      // validateBodyData.first_name = first_name;
      // validateBodyData.last_name = last_name;
      // validateBodyData.phone_number = phone_number;
      // validateBodyData.active = active;
      // validateBodyData.addresses = addresses;
      // validateBodyData.roles = roles;
      // validateBodyData.password = password;
      // validateBodyData.email = email;
      const singleRecordErrors = await validate(validateBodyData);
      if (singleRecordErrors.length > 0) {
        singleRecordErrors.map((err) => {
          this.errorResponse = err.constraints;
          return this.sendErrorResponse();
        });
      } else {
        if (isEmailExisted) {
          this.errorResponse = { error: 'Email was existed' };
          return this.sendErrorResponse();
        } else {
          await this.authController.register(bodyData).then(() => {
            this.sendSuccessResponse(undefined, {
              msg: 'The account was created successfully. Please access email and follow the instructions'
            });
          });
        }
      }
    });
  }

  public async login() {
    await this.handleBodyDataResponse(APIMethodType.POST, async (bodyData: LoginBodyDataValidation) => {
      const validateBodyData = new LoginBodyDataValidation();
      const { email, password } = bodyData;
      validateBodyData.password = password;
      validateBodyData.email = email;
      const singleRecordErrors = await validate(validateBodyData);
      if (singleRecordErrors.length > 0) {
        singleRecordErrors.map((err) => {
          this.errorResponse = err.constraints;
          return this.sendErrorResponse();
        });
      } else {
        const customer = await this.crudService.findOneByAttribute({
          nameAttr: 'email',
          valueAttr: email
        });
        if (customer) {
          const isValid = this.passwordConfig.validPassword(password, customer.hash, customer.salt);
          const isActive = await this.securityConfig.isActive(email);
          if (isActive) {
            if (isValid) {
              const tokenObject = await this.securityConfig.issueJWT(customer as Customer);
              if (tokenObject) {
                this.sendSuccessResponse(undefined, {
                  success: true,
                  token: tokenObject.token,
                  expiresIn: tokenObject.expires
                });
              }
            } else {
              this.errorResponse = { success: false, msg: 'you entered the wrong password' };
              return this.sendErrorResponse();
            }
          } else {
            this.errorResponse = { success: false, msg: 'your account is not actived' };
            return this.sendErrorResponse();
          }
        } else {
          this.errorResponse = { error: 'customer was not defined' };
          return this.sendErrorResponse();
        }
      }
    });
  }

  public async verifyJWT(callback: () => Promise<unknown>) {
    const tokenParts = this.req.headers.authorization?.split(' ');
    const PUB_KEY = await this.securityConfig.publicKey();
    if (tokenParts) {
      if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
        try {
          const verification: JwtVerifyType = jwt.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });

          // *** START Handle ExpiredTime
          const { sub, exp, iat } = verification;
          const currentTimestamp = new Date().getTime();
          /*
          console.log(`exp: `, exp);
          console.log(`current`, currentTimestamp);
          console.log(`iat: `, iat);
          console.log(`exp > current`, exp > currentTimestamp);
          */
          if (exp > currentTimestamp) {
            try {
              await this.restartDBConnection();
              const customer = await this.crudService.findOne(sub);
              if (customer) {
                callback();
              } else {
                this.errorResponse = { success: false, msg: 'Customer is not existed' };
                return this.sendErrorResponse();
              }
            } catch (error) {
              this.errorResponse = { success: false, error };
              return this.sendErrorResponse();
            }
          } else {
            this.errorResponse = { success: false, msg: 'Token was expired. Please login again' };
            return this.sendErrorResponse();
          }
          // *** END Handle ExpiredTime
        } catch (err) {
          this.errorResponse = { success: false, msg: err };
          return this.sendErrorResponse();
        }
      } else {
        this.errorResponse = { success: false, msg: 'You are not authorized to visit this route' };
        return this.sendErrorResponse();
      }
    } else {
      this.errorResponse = { success: false, msg: 'You are not authorized to visit this route' };
      return this.sendErrorResponse();
    }
  }

  async activeAccount() {
    await this.handleUrlParamResponse(APIMethodType.GET, (email: string) => this.authController.activeAccount(email));
  }
}

export default AuthMiddleware;

// class AuthMiddleware extends ApiProvider {
//   constructor(req: NextApiRequest, res: NextApiResponse) {
//     super(req, res);
//   }

//   protected readonly methodProvider = new MethodProvider(this.req, this.res);
//   private passwordConfig = Container.get(PasswordConfig);
//   private securityConfig = Container.get(SecurityConfig);
//   private customerService = Container.get(CustomerService);
//   private authController = Container.get(AuthController);

//   public async register() {
//     await this.handleBodyDataResponse('post', async (bodyData: RegisterBodyDataValidation) => {
//       const validateBodyData = new RegisterBodyDataValidation();
//       const { username, first_name, last_name, phone_number, active, addresses, email, password, roles } = bodyData;
//       const isEmailExisted = await this.authController.verifyExistedEmail(email);
//       validateBodyData.username = username;
//       validateBodyData.first_name = first_name;
//       validateBodyData.last_name = last_name;
//       validateBodyData.phone_number = phone_number;
//       validateBodyData.active = active;
//       validateBodyData.addresses = addresses;
//       validateBodyData.roles = roles;
//       validateBodyData.password = password;
//       validateBodyData.email = email;
//       const singleRecordErrors = await validate(validateBodyData);
//       if (singleRecordErrors.length > 0) {
//         singleRecordErrors.map((err) => {
//           this.errorResponse = err.constraints;
//           return this.sendErrorResponse();
//         });
//       } else {
//         if (isEmailExisted) {
//           this.errorResponse = { error: 'Email was existed' };
//           return this.sendErrorResponse();
//         } else {
//           await this.authController.register(bodyData).then(() => {
//             this.sendSuccessResponse(undefined, {
//               msg: 'The account was created successfully. Please access email and follow the instructions'
//             });
//           });
//         }
//       }
//     });
//   }

//   public async login() {
//     await this.handleBodyDataResponse('post', async (bodyData: LoginBodyDataValidation) => {
//       const validateBodyData = new LoginBodyDataValidation();
//       const { email, password } = bodyData;
//       validateBodyData.password = password;
//       validateBodyData.email = email;
//       const singleRecordErrors = await validate(validateBodyData);
//       if (singleRecordErrors.length > 0) {
//         singleRecordErrors.map((err) => {
//           this.errorResponse = err.constraints;
//           return this.sendErrorResponse();
//         });
//       } else {
//         const customer = await this.customerService.findOneByAttribute({ nameAttr: 'email', valueAttr: email });
//         if (customer) {
//           const isValid = this.passwordConfig.validPassword(password, customer.hash, customer.salt);
//           const isActive = await this.securityConfig.isActive(email);
//           if (isActive) {
//             if (isValid) {
//               const tokenObject = await this.securityConfig.issueJWT(customer);
//               if (tokenObject) {
//                 this.sendSuccessResponse(undefined, {
//                   success: true,
//                   token: tokenObject.token,
//                   expiresIn: tokenObject.expires
//                 });
//               }
//             } else {
//               this.errorResponse = { success: false, msg: 'you entered the wrong password' };
//               return this.sendErrorResponse();
//             }
//           } else {
//             this.errorResponse = { success: false, msg: 'your account is not actived' };
//             return this.sendErrorResponse();
//           }
//         } else {
//           this.errorResponse = { error: 'customer was not defined' };
//           return this.sendErrorResponse();
//         }
//       }
//     });
//   }

//   public async verifyJWT(callback: () => Promise<T>) {
//     const tokenParts = this.req.headers.authorization?.split(' ');
//     const PUB_KEY = await this.securityConfig.publicKey();
//     if (tokenParts) {
//       if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
//         try {
//           const verification: JwtVerifyType = jwt.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });

//           // *** START Handle ExpiredTime
//           const { sub, exp, iat } = verification;
//           const currentTimestamp = new Date().getTime();
//           /*
//           console.log(`exp: `, exp);
//           console.log(`current`, currentTimestamp);
//           console.log(`iat: `, iat);
//           console.log(`exp > current`, exp > currentTimestamp);
//           */
//           if (exp > currentTimestamp) {
//             try {
//               await this.restartDBConnection();
//               const customer = await this.customerService.findOne(sub);
//               if (customer) {
//                 callback();
//               } else {
//                 this.errorResponse = { success: false, msg: 'Customer is not existed' };
//                 return this.sendErrorResponse();
//               }
//             } catch (error) {
//               this.errorResponse = { success: false, error };
//               return this.sendErrorResponse();
//             }
//           } else {
//             this.errorResponse = { success: false, msg: 'Token was expired. Please login again' };
//             return this.sendErrorResponse();
//           }
//           // *** END Handle ExpiredTime
//         } catch (err) {
//           this.errorResponse = { success: false, msg: err };
//           return this.sendErrorResponse();
//         }
//       } else {
//         this.errorResponse = { success: false, msg: 'You are not authorized to visit this route' };
//         return this.sendErrorResponse();
//       }
//     } else {
//       this.errorResponse = { success: false, msg: 'You are not authorized to visit this route' };
//       return this.sendErrorResponse();
//     }
//   }

//   async activeAccount() {
//     await this.handleUrlParamResponse('get', (email: string) => this.authController.activeAccount(email));
//   }
// }

// export default AuthMiddleware;
