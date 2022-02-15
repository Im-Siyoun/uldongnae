import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CouponsController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon, CouponSchema } from './schemas/coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [CouponsController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponsModule {}
