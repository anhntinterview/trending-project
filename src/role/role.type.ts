import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Customer } from '@db/entity/customer.entity';

export class RoleBodyDataValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Customer)
  customers?: Array<Customer>;
}