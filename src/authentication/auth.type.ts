import { CustomerAddress } from '@db/entity/customer-address.entity';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength, ValidateNested, validate } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@db/entity/role.entity';

export type JwtVerifyType = {
  sub: string;
  iat: number;
  exp: number;
};

export class RegisterBodyDataValidation {
  @IsNotEmpty()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone_number: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsNotEmpty()
  active: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerAddress)
  addresses?: Array<CustomerAddress>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles?: Array<Role>;
}
export class LoginBodyDataValidation {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;
}
