import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import {Product} from './product.entity';

@Entity({name: 'tag'})
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  tag_name: string;

  @Column({ type: 'text'})
  icon: string;

  @Column({type: 'timestamptz'})
  created_at: Date;

  @Column({type: 'timestamptz'})
  updated_at: Date;

  @Column({type: 'uuid', generated: "uuid"})
  created_by: string;

  @Column({type: 'uuid', generated: "uuid"})
  updated_by: string;

  @Column()
  estimate_days: number;

  @ManyToMany(() => Product, (product) => product.tags)
  @JoinTable()
  products: Product[];
}
