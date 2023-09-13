import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, BeforeInsert, OneToMany, JoinColumn } from "typeorm";
import { CustomerAddress } from './customer-address.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICustomer } from "@root/type/entity/ICustomer";
// import { CustomerSession } from "./customer-session.entity";
import { Role } from "./role.entity";

@Entity({name: 'customer'})
export class Customer implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length: 100})
  @IsNotEmpty()
  username: string;

  @Column({type: 'varchar', length: 100})
  @IsNotEmpty()
  first_name: string;

  @Column({type: 'varchar', length: 100})
  @IsNotEmpty()
  last_name: string;

  @Column({type: 'varchar', length: 100})
  @IsNotEmpty()
  phone_number: string;

  @Column({ unique: true, type: 'text' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({type: 'text'})
  @IsNotEmpty()
  hash: string;

  @Column({type: 'text'})
  @IsNotEmpty()
  salt: string;

  @Column({type: 'boolean'})
  @IsNotEmpty()
  active: boolean;

  @CreateDateColumn({type: 'timestamptz'})
  created_at: Date;

  @CreateDateColumn({type: 'timestamptz'})
  updated_at: Date;

  @ManyToMany(() => CustomerAddress, (address) => address.customers, { cascade: true })
  addresses?: CustomerAddress[];

  // @ManyToMany(() => CustomerSession, (session) => session.customers)
  // sessions?: CustomerSession[];

  @ManyToMany(() => Role, (role) => role.customers, { cascade: true })
  roles?: Role[];
}
