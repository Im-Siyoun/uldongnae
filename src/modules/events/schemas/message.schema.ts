import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({
    type: String,
    required: true,
  })
  nickname: string;

  @Prop({
    type: String,
    required: true,
  })
  message: string;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
