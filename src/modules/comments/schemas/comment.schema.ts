import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  writer: string;

  @Prop({
    type: String,
    required: true,
  })
  original: string;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
