import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Advertisement {
  @Prop({
    required: true,
    type: String,
  })
  writer: string;

  @Prop({
    required: true,
    type: Number,
  })
  exhibition: number;

  @Prop({
    required: true,
    type: String,
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