import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Customer } from './customer.entity';

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'text'})
  address_line1: string;

  @Column({type: 'text'})
  address_line2: string;

  @Column({type: 'varchar', length: 255})
  postal_code: string;

  @Column({type: 'varchar', length: 255})
  country: string;

  @Column({type: 'varchar', length: 255})
  city: string;

  @Column({type: 'varchar', length: 255})
  phone_number: string;

  @Column({type: 'timestamptz'})
  created_at: Date;

  @Column({type: 'timestamptz'})
  updated_at: Date;

  @Column({type: 'uuid', generated: "uuid"})
  created_by: string;

  @Column({type: 'uuid', generated: "uuid"})
  updated_by: string;

  @ManyToMany(() => Customer, (customer) => customer.addresses)
  @JoinTable()
  customer: Customer;
}
