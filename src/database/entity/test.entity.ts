import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity({name: 'tableA'})
export class TableA {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  name: string;

  @ManyToMany(() => TableB, (tableB) => tableB.name, {cascade: true, eager: false})
  @JoinTable({name: 'tableA_tableB'})
  tableBs: TableB[];

  @OneToMany(() => TableC, (tableC) => tableC.name)
  tableCs: TableC[];

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

@Entity({name: 'tableC'})
export class TableC {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  name: string;

  @ManyToOne(() => TableA, (tableA) => tableA.name)
  tableA: TableA;

}

@Entity({ name: 'lab_entity' })
export class LabEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;
}
