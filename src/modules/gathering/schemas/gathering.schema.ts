import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Gathering {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  writer: string;

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
    type: Array,
  })
  image: Array<string>;

  @Prop({
    type: String,
    required: true,
  })
  state: '모집중' | '인원마감' | '모집완료';

  @Prop({
    type: String,
    required: true,
  })
  condition: string;

  @Prop({
    type: Number,
    required: true,
  })
  maximum: number;
}

export type GatheringDocument = Gathering & Document;

export const GatheringSchema = SchemaFactory.createForClass(Gathering);
