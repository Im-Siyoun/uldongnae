import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Participant {
  @Prop({
    type: String,
    required: true,
  })
  SocketId: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  nickname: string;
}

export type ParticipantDocument = Participant & Document;

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
