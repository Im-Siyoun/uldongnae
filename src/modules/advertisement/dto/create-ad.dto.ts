import { IsNumber, IsString } from 'class-validator';

export class CreateAdDto {
  @IsString()
  writer: string;

  @IsNumber()
  exhibition: number;

  @IsString()
  postId: string;

  @IsString()
  category: string;

  @IsString()
  region: string;

  @IsString()
  street: string;

  @IsNumber()
  exhibited: number;

  @IsString()
  state: string;
}
