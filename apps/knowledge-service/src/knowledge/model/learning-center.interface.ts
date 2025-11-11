export interface IQuestionDto {
  value: string;
  accept: boolean;
}

export type ThemeType =
  | 'JavaScript'
  | 'Typescript'
  | 'Angular'
  | 'Vue'
  | 'DataScience';

export enum QuestionThemeEnum {
  JavaScript = 'JavaScript',
  Typescript = 'Typescript',
  Angular = 'Angular',
  Vue = 'Vue',
  DataScience = 'DataScience',
}

export interface IArticleCreator {
  id: string;
  name: string;
}

export interface IEditBodyArticle {
  id: string;
  title?: string;
  description?: string;
}
export class CreateArticleDto {
  title: string;
  stack: string;
  text: string;
  tags: string[];
}

export class DeleteArticleDto {
  id: string;
}

export class CreateQuestionDto {
  answers: Array<IQuestionDto>;
  question: string;
  description?: string;
  theme: ThemeType;
}
