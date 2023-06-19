import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ type: 'jsonb', default: [{ option: '', votes: 0 }] })
  options: { option: string; votes: number }[];

  @Column({ name: 'totalvotes', default: 0 })
  totalVotes: number;
}
