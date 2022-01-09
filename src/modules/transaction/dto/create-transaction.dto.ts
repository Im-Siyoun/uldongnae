import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { GradeType } from '../schemas/transacton.type';

export class CreateTransactionDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly writer: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly state: string;

  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsArray()
  readonly image?: Array<string>;

  @IsOptional()
  @IsNumber()
  readonly interests?: number;

  @IsOptional()
  @IsNumber()
  readonly views?: number;

  @IsObject()
  readonly grade: GradeType;
}
