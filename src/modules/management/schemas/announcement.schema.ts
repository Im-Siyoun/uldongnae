import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Announcement {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Number,
    required: true,
  })
  eventno: number;

  @Prop({
    type: String,
    required: true,
  })
  state: string;

  @Prop({
    type: Date,
    required: true,
  })
  deadline: Date;

  @Prop({
    type: String,
    required: true,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
  })
  category: string;
}

export type AnnouncementDocument = Announcement & Document;

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
