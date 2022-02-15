import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  writer?: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly category: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsString()
  readonly state: string;

  @IsOptional()
  @IsNumber()
  readonly interests?: number;

  @IsOptional()
  @IsNumber()
  readonly views?: number;
}
