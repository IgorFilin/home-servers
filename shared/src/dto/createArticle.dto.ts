import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  text: string;

  tags: string[];
}

export class DeleteArticleDto {
  @IsString()
  id: string;
}
