import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly email: string;

  readonly salt: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly birth: string;

  @IsString()
  @IsOptional()
  readonly profile?: string;

  @IsNumber()
  @IsOptional()
  readonly latitude?: number;

  @IsNumber()
  @IsOptional()
  readonly longitude?: number;

  @IsString()
  @IsOptional()
  readonly region?: string;

  readonly lastLogin?: Date;

  readonly lastNicknameChange?: Date;

  readonly roles?: Array<any>;
}
