import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Business {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  owner: string;

  @Prop({
    type: Number,
    required: true,
    unique: true,
  })
  Businessno: number;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  address: string;

  @Prop({
    type: String,
  })
  image: string[];

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: String,
  })
  informationImage: string;

  @Prop({
    type: String,
    required: true,
  })
  information: string;

  @Prop({
    type: String,
    required: true,
  })
  openAt: string;

  @Prop({
    type: String,
    required: true,
  })
  closeAt: string;
}

export type BusinessDocument = Business & Document;

export const BusinessSchema = SchemaFactory.createForClass(Business);
