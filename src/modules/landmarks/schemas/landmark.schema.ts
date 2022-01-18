import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { LocationType } from './Location.type';

@Schema({ timestamps: true, versionKey: false })
export class Landmark {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: String,
    required: true,
  })
  type: '문화재' | '테마파크';

  @Prop({
    type: String,
    required: true,
  })
  businessHours: string; // 굳이 초단위까지 저장하지 않으므로 문자열로 저장합니다.

  @Prop({
    type: Array,
    required: true,
  })
  image: Array<string>;

  @Prop({
    type: Object,
    required: true,
  })
  location: LocationType;
}

export type LandmarkDocument = Landmark & Document;

export const LandmarkSchema = SchemaFactory.createForClass(Landmark);
