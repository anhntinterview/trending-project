import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";

@Entity({name: 'tableA'})
export class TableA {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  name: string;

  @ManyToMany(() => TableB, (tableB) => tableB.name, {cascade: true, eager: false})
  @JoinTable({name: 'tableA_tableB'})
  tableBs: TableB[];

}

@Entity({name: 'tableB'})
export class TableB {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  name: string;

  @ManyToMany(() => TableA, (tableA) => tableA.name, {cascade: true, eager: false})
  @JoinTable({name: 'tableB_tableA'})
  tableAs: TableA[];

}
