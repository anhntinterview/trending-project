import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";

@Entity({name: 'Related_Test'})
export class RelatedTest {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  related_name: string;

}

@Entity({name: 'Test'})
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'varchar', length: 100})
  name: string;

  @ManyToMany(() => Test, (test) => test.related_test)
  @JoinTable()
  related_test: RelatedTest[];

}


