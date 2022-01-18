import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { data } from 'cheerio/lib/api/attributes';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant, ParticipantDocument } from './schemas/participant.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  createChat(client: Socket) {
    const chatid = `Chat:${client.id}`;
    client.data.roomId = chatid;
    client.join(chatid);
    client.emit('createChat', {
      message: `${chatid} 채팅방이 생성되었습니다.`,
    });
  }

  enterChat(client: Socket, chatid: string) {
    client.data.roomId = chatid;
    console.log(client.rooms)
    client
      .to(chatid)
      .emit('enterChat', { message: `${chatid} 채팅방에 입장하셨습니다.` });
  }

  async logout(client: Socket) {
    client.rooms.clear();
    const result = await this.participantModel.findOneAndDelete({
      SocketId: client.id,
    });

    return result;
  }

  async register(content: CreateParticipantDto): Promise<Participant> {
    const participant = new this.participantModel(content);
    const result = await participant.save();

    return result;
  }

  async sendMessage(nickname: string): Promise<Participant> {
    const recipient = await this.participantModel.findOne({
      nickname,
    });

    return recipient;
  }
}
