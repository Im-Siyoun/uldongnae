import { IsNumber, IsString } from 'class-validator';
import { isValidObjectId, ObjectId } from 'mongoose';

export class CreateBusinessDto {
  @IsString()
  name: string;

  @IsString()
  owner: ObjectId;

  @IsNumber()
  businessno: number;

  @IsString()
  address: string;

  image?: string;

  @IsString()
  category: string;

  informationImage?: string;

  @IsString()
  information: string;

  @IsString()
  openAt: string;

  @IsString()
  closeAt: string;
}
