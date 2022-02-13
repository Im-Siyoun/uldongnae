import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Message } from './message.schema';
import { Participant } from './participant.schema';

@Schema({ timestamps: false, versionKey: false })
export class Chat {
  @Prop({
    type: String,
  })
  roomId: string;

  @Prop({
    type: Array,
  })
  users: Participant[];

  @Prop({
    type: Array,
  })
  messages: Message[];
}

export type ChatDocument = Chat & Document;

export const ChatSchema = SchemaFactory.createForClass(Chat);
