import { CustomerAddress } from '@db/entity/customer-address.entity';
import { IsBoolean, IsEmail, IsNotEmpty, IsObject, IsString, validate } from 'class-validator';

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
  phone_number: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsNotEmpty()
  active: boolean;

  @IsObject()
  addresses?: Array<CustomerAddress>;
}
export class LoginBodyDataValidation {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
