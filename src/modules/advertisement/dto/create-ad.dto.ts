import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAdDto {
  @IsString()
  @IsOptional()
  writer?: string;

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
