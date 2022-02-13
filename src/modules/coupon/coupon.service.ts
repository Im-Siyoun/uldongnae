import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon, CouponDocument } from './schemas/coupon.schema';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name)
    private couponModel: Model<CouponDocument>,
  ) {}

  async create(coupondto: CreateCouponDto): Promise<Coupon> {
    const coupon = {
      ...coupondto,
    };
    const result = await this.couponModel.create(coupon);

    return result;
  }

  async findAll(): Promise<Coupon[]> {
    const coupons = await this.couponModel.find();

    return coupons;
  }

  async find(id: string): Promise<Coupon> {
    const coupon = await this.couponModel.findOne({ id });
    if (!coupon) {
      throw new Error('Coupon not found');
    }

    return coupon;
  }

  async findByWriter(writer: string): Promise<Coupon> {
    const coupon = await this.couponModel.findOne({ writer });
    if (!coupon) {
      throw new Error('Coupon not found');
    }

    return coupon;
  }

  async update(id: string, coupondto: UpdateCouponDto): Promise<Coupon> {
    const coupon = await this.couponModel.findOneAndUpdate({ id }, coupondto);

    return coupon;
  }

  async delete(id: string): Promise<Coupon> {
    const coupon = await this.couponModel.findOneAndDelete({ id });

    return coupon;
  }

  async addpermit(id: string, userid: string): Promise<Coupon> {
    const coupon = await this.couponModel.findOneAndUpdate(
      { id },
      { $push: { permit: userid } },
    );

    return coupon;
  }
}
