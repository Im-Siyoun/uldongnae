import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Coupon {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  permissions: string[];

  @Prop({
    type: Date,
    required: true,
  })
  expiryDate: Date;
}

export type CouponDocument = Coupon & Document;

export const CouponSchema = SchemaFactory.createForClass(Coupon);
