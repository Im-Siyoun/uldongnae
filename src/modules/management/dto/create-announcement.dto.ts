import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNumber()
  eventno: number;

  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  state: string;

  @IsString()
  deadline: string;

  @IsEnum(['이벤트', '공지'])
  category: string;
}
