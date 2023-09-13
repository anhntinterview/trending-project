import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import {Tag} from "./tag.entity";

@Entity({name: 'product'})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  product_name: string;

  @Column({type: 'varchar', length: 255})
  sku: string;

  @Column({type: 'float'})
  regular_price: number;

  @Column({type: 'float'})
  discount_price: number;

  @Column({type: 'int'})
  quantity: number;

  @Column({type: 'varchar', length: 165})
  short_description: string;

  @Column({type: 'text'})
  product_description: string;

  @Column({type: 'float'})
  product_weight: number;

  @Column({type: 'varchar', length: 255})
  product_note: string;

  @Column()
  publisher: boolean;

  @Column({type: 'timestamptz'})
  created_at: Date;

  @Column({type: 'timestamptz'})
  updated_at: Date;

  @Column({type: 'uuid', generated: "uuid"})
  created_by: string;

  @Column({type: 'uuid', generated: "uuid"})
  updated_by: string;

  // @ManyToMany(() => Tag, (tag) => tag.products)
  // tags: Tag[];

}
