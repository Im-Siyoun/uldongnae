import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { Participant, ParticipantSchema } from './schemas/participant.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
