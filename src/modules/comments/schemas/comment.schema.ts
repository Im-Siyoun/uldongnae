import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Role } from 'src/modules/roles/role.enum';

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  writer: ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  original: ObjectId;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
