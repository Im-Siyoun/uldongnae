import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { Participant, ParticipantSchema } from './schemas/participant.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
