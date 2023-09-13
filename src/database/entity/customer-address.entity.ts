import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, BeforeInsert } from 'typeorm';
import { Customer } from './customer.entity';
import { ICustomerAddress } from '@root/type/entity/ICustomerAddress';

@Entity({ name: 'customer_address' })
export class CustomerAddress implements ICustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  address_line1: string;

  @Column({ type: 'text' })
  address_line2: string;

  @Column({ type: 'varchar', length: 255 })
  postal_code: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  phone_number: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToMany(() => Customer, (customer) => customer.addresses)
  @JoinTable()
  customers?: Customer[];
}
