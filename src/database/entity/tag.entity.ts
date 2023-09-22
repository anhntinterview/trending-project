import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { ITag } from '@root/type/entity/ITag';
import { Post } from './post.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({name: 'tag'})
export class Tag implements ITag{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @CreateDateColumn({type: 'timestamptz'})
  created_at: Date;

  @CreateDateColumn({type: 'timestamptz'})
  updated_at: Date;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable()
  posts?: Post[];
}
