import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './customer.entity';
import { ICustomer } from '@/util/entity/ICustomer';
import { ICustomerAddress } from '@/util/entity/ICustomerAddress';

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

  @Column({ type: 'uuid', generated: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid', generated: 'uuid' })
  updated_by: string;

  @ManyToMany(() => Customer, (customer) => customer.addresses)
  @JoinTable()
  customers?: Customer[];

  @BeforeInsert()
  generateUUID() {
    this.created_by = uuidv4();
    this.updated_by = uuidv4();
  }
}
