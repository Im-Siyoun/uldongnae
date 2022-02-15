import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
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

  async findAll(): Promise<Business[]> {
    const result = await this.businessModel.find();

    return result;
  }

  async findOne(id: string): Promise<Business> {
    const result = await this.businessModel.findOne({ _id: id });

    return result;
  }

  async update(id: string, businessdto: UpdateBusinessDto): Promise<Business> {
    const result = await this.businessModel.findOneAndUpdate(
      { _id: id },
      businessdto,
    );

    return result;
  }

  async delete(id: string): Promise<Business> {
    const result = await this.businessModel.findOneAndDelete({ _id: id });

    return result;
  }
}
