import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Tag } from '@db/entity/tag.entity';

export class PostBodyDataValidation {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsString()
  excerpt: string;

  @IsString()
  ogImage: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tag)
  tags?: Array<Tag>;
}