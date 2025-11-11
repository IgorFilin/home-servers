import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagsEntity } from './tags.entity';
import { ViewsEntity } from './views-article.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @OneToMany(() => ViewsEntity, (views) => views.article, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  views: ViewsEntity[];

  @Column()
  userId: string;

  @ManyToMany(() => TagsEntity, (tags) => tags.article)
  @JoinTable()
  tags: TagsEntity[];
}
