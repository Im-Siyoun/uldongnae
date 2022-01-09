import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  type: '게시글' | '사용자' | '채팅';

  @IsString()
  reportId: string;

  @IsString()
  reason: string;
}
