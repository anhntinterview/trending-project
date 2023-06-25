import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { CustomerAddress } from './customer-address.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  first_name: string;

  @Column({type: 'varchar', length: 100})
  last_name: string;

  @Column({type: 'varchar', length: 100})
  phone_number: string;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({type: 'text'})
  password_hash: string;

  @Column({type: 'boolean'})
  active: boolean;

  @Column({type: 'timestamptz'})
  created_at: Date;

  @Column({type: 'timestamptz'})
  updated_at: Date;

  @Column({type: 'uuid', generated: "uuid"})
  created_by: string;

  @Column({type: 'uuid', generated: "uuid"})
  updated_by: string;

  @ManyToMany(() => CustomerAddress, (address) => address.customer)
  addresses: CustomerAddress[];
}
