import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
// import { Customer } from './customer.entity';
import { IsNotEmpty } from 'class-validator';
import { ICustomerSession } from '@root/type/entity/ICustomerSession';

@Entity({ name: 'customer_session' })
export class CustomerSession implements ICustomerSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  @IsNotEmpty()
  value: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // @ManyToMany(() => Customer, (customer) => customer.sessions, { cascade: true })
  // @JoinTable()
  // customers?: Customer[]
}
