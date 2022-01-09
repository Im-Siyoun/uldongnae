import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBusinessDto } from './dto/create-business.dto';
import { Business, BusinessDocument } from './schemas/business.schema';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
  ) {}

  async create(businessdto: CreateBusinessDto): Promise<Business> {
    const business = {
      ...businessdto,
    };
    const result = await this.businessModel.create(business);

    return result;
  }
}
