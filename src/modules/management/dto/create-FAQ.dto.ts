import { IsString } from 'class-validator';

export class CreateFAQDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
