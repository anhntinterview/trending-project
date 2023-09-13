import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { IPost } from '@root/type/entity/IPost';
import { IsNotEmpty } from 'class-validator';
import { Tag } from './tag.entity';
import slugify from 'slugify';

@Entity({ name: 'post' })
export class Post implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  title: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  coverImage: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  excerpt: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  ogImage: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  created_by: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  updated_by: string;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  tags?: Tag[];
}
