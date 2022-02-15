import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly content: string;

  @IsString()
  @IsOptional()
  writer: string;

  @IsString()
  readonly original: string;
}
