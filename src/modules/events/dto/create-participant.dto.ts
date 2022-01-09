import { IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  readonly SocketId: string;

  @IsString()
  readonly nickname: string;
}
