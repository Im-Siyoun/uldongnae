import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { data } from 'cheerio/lib/api/attributes';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { Participant, ParticipantDocument } from './schemas/participant.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async createChat(client: Socket) {
    const chatid = `Chat:${client.id}`;
    const room = {
      roomId: chatid,
      users: [],
    };
    room.users.push(
      await this.participantModel.findOne({ SocketId: client.id }),
    );
    this.chatModel.create(room);

    client.join(chatid);
    client.emit('createChat', {
      message: `${chatid} 채팅방이 생성되었습니다.`,
    });
  }

  async enterChat(client: Socket, chatid: string) {
    const user = await this.participantModel.findOne({ SocketId: client.id });
    const chat = await this.chatModel.findOneAndUpdate(
      { roomId: chatid },
      { $push: { users: user } },
    );

    client.join(chatid);
    client.to(chatid).emit('enterChat', {
      message: `${user.nickname}님이 채팅방에 입장하셨습니다.`,
    });
  }

  async logout(client: Socket) {
    client.rooms.clear();
    const result = await this.participantModel.findOneAndDelete({
      SocketId: client.id,
    });

    return result;
  }

  async register(content: CreateParticipantDto): Promise<any> {
    const participant = new this.participantModel(content);
    const result = await participant.save((err) => {
      if (err) {
        return err.message;
      }

      return 'success';
    });
  }

  async sendMessage(client: Socket, body: any): Promise<void> {
    client.to(body.chatid).emit('message', {
      message: `${body.message}`,
    });
  }
}
