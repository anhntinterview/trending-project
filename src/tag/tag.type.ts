import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Post } from '@db/entity/post.entity';

export class TagBodyDataValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Post)
  posts?: Array<Post>;
}