import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Post {
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
    type: String,
    required: true,
  })
  writer: string;

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
  })
  state: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  interests: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  views: number;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
