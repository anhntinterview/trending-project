import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, BeforeInsert } from 'typeorm';
import { Customer } from './customer.entity';
import { IRole } from '@root/type/entity/IRole';
import { IsNotEmpty } from 'class-validator';

enum ROLE_NAME {
  "AUTHOR"="author",
  "ADMIN"="admin",
}

@Entity({ name: 'role' })
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: ROLE_NAME;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToMany(() => Customer, (customer) => customer.roles)
  @JoinTable()
  customers?: Customer[];
}
