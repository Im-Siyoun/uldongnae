import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Role } from 'src/modules/roles/role.enum';

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id?: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  salt: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  nickname: string;

  @Prop({
    type: String,
  })
  profile: string;

  @Prop({
    type: Number,
  })
  latitude: number;

  @Prop({
    type: Number,
  })
  longitude: number;

  @Prop({
    type: String,
  })
  region: string;

  @Prop({
    type: Date,
  })
  lastLogin: Date;

  @Prop({
    type: Date,
  })
  lastNicknameUpdate: Date;

  @Prop({
    type: Array,
    required: true,
    default: [0],
  })
  roles: Role[];

  @Prop({
    type: String,
    required: true,
  })
  birth: string;

  @Prop({
    type: Array,
    required: true,
    default: [],
  })
  interests: string[];

  @Prop({
    type: Array,
    required: true,
    default: [],
  })
  words: string[];

  @Prop({
    type: Date,
  })
  recentlyUpdated: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
