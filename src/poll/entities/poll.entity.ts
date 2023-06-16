import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column('jsonb')
  options: { option: string; votes: number }[];

  @Column({name: 'totalvotes', default: 0})
  totalVotes: number;
}
