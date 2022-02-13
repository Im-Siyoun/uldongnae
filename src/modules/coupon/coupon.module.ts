import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CouponsController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon, CouponSchema } from './schemas/coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
  controllers: [CouponsController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponsModule {}
