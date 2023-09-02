import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Customer } from './customer.entity';
import { v4 as uuidv4 } from 'uuid';
import { IsNotEmpty } from 'class-validator';
import { ICustomerSession } from '@/util/entity/ICustomerSession';

@Entity({ name: 'customer_session' })
export class CustomerSession implements ICustomerSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @IsNotEmpty()
  value: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'uuid', generated: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid', generated: 'uuid' })
  updated_by: string;

  @ManyToMany(() => Customer, (customer) => customer.sessions, { cascade: true })
  @JoinTable()
  customers?: Customer[]

  @BeforeInsert()
  generateUUID() {
    this.created_by = uuidv4();
    this.updated_by = uuidv4();
  }
}
