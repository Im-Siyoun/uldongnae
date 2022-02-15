import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes';

import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './schemas/coupon.schema';

@Controller('/coupons')
export class CouponsController {
  constructor(
    private readonly couponService: CouponService,
    private readonly userService: UsersService,
    private readonly authservice: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createCouponDto: CreateCouponDto,
    @Req() request: any,
  ): Promise<Coupon> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);
    createCouponDto.Issuer = json.user._id;

    const coupon = await this.couponService.create(createCouponDto);

    return coupon;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Coupon[]> {
    return this.couponService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<Coupon> {
    return this.couponService.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCouponDTO: UpdateCouponDto,
  ): Promise<Coupon> {
    return this.couponService.update(id, updateCouponDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<Coupon> {
    return this.couponService.delete(id);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) userid: string,
  ): Promise<Coupon> {
    const user = await this.userService.find(userid);

    return this.couponService.addpermit(id, user._id);
  }
}
