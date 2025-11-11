import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('views')
export class ViewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => ArticleEntity, (article) => article.views, {
    onDelete: 'CASCADE',
  })
  article: ArticleEntity;
}
