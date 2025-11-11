import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  isCorrect: boolean;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => QuestionEntity, (question) => question.answer)
  question: QuestionEntity;
}
