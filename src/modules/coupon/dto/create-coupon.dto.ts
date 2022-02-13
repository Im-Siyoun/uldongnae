import { IsArray, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  name: string;

  @IsArray()
  permissions: Array<string>;

  @IsString()
  expiryDate: string;
}
