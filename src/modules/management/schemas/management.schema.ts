import { Prop } from '@nestjs/mongoose';

export class Management {
  @Prop({
    type: Array,
    required: true,
    unique: true,
  })
  words: Array<string>;
}

export type bannedDocument = Management & Document;
