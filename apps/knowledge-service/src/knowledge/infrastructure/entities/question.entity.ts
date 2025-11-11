import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  theme: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  userId: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answer: AnswerEntity[];
}
