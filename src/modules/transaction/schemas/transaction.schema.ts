import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { GradeType } from './transacton.type';

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
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
    type: Array,
  })
  image: string[];

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

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Object,
    required: true,
  })
  grade: GradeType;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
