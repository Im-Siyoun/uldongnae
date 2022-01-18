import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGatheringDto {
  @IsString()
  writer: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  image: Array<String>;

  @IsString()
  state: '모집중' | '인원마감' | '모집완료';

  @IsString()
  condition: string;

  @IsNumber()
  maximum: number;
}
