import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Ad {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  writer: string;

  @Prop({
    required: true,
    type: Number,
  })
  exhibition: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Post',
  })
  postId: string;

  @Prop({
    required: true,
    type: String,
  })
  category: string;

  @Prop({
    required: true,
    type: String,
  })
  region: string;

  @Prop({
    required: true,
    type: String,
  })
  street: string;

  @Prop({
    required: true,
    type: Number,
  })
  exhibited: number;

  @Prop({
    required: true,
    type: String,
  })
  state: string;
}

export type AdDocument = Ad & Document;

export const AdSchema = SchemaFactory.createForClass(Ad);
