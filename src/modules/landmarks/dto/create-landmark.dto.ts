import { IsArray, IsObject, IsString } from 'class-validator';

import { LocationType } from '../schemas/Location.type';

export class CreateLandmarkDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  type: '문화재' | '테마파크';

  @IsString()
  businessHours: string;

  @IsArray()
  image: Array<string>;

  @IsObject()
  location: LocationType;
}
