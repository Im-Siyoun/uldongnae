import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class FAQ {
  @Prop({
    type: String,
    required: true,
  })
  category: string;

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
}

export type FAQDocument = FAQ & Document;

export const FAQSchema = SchemaFactory.createForClass(FAQ);
