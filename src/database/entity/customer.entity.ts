import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, BeforeInsert } from "typeorm";
import { CustomerAddress } from './customer-address.entity';
import { v4 as uuidv4 } from 'uuid';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({name: 'customer'})
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
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
  password_hash: string;

  @Column({type: 'boolean'})
  @IsNotEmpty()
  active: boolean;

  @CreateDateColumn({type: 'timestamptz'})
  created_at: Date;

  @CreateDateColumn({type: 'timestamptz'})
  updated_at: Date;

  @Column({type: 'uuid', generated: "uuid"})
  created_by: string;

  @Column({type: 'uuid', generated: "uuid"})
  updated_by: string;

  @ManyToMany(() => CustomerAddress, (address) => address.customers, { cascade: true })
  addresses: CustomerAddress[];

  @BeforeInsert()
  generateUUID() {
    this.created_by = uuidv4();
    this.updated_by = uuidv4();
  }
}
