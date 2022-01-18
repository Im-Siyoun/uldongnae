import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad, AdDocument } from './schemas/advertisement.schema';

@Injectable()
export class AdService {
  constructor(
    @InjectModel(Ad.name)
    private adModel: Model<AdDocument>,
  ) {}

  async create(addto: CreateAdDto): Promise<Ad> {
    const ad = {
      ...addto,
    };
    const result = await this.adModel.create(ad);

    return result;
  }

  async findAll(): Promise<Ad[]> {
    const ads = await this.adModel.find();

    return ads;
  }

  async find(id: string): Promise<Ad> {
    const ad = await this.adModel.findOne({ id });
    if (!ad) {
      throw new Error('Ad not found');
    }

    return ad;
  }

  async findByWriter(writer: string): Promise<Ad> {
    const ad = await this.adModel.findOne({ writer });
    if (!ad) {
      throw new Error('Ad not found');
    }

    return ad;
  }

  async update(id: string, addto: UpdateAdDto): Promise<Ad> {
    const ad = await this.adModel.findOneAndUpdate({ id }, addto);

    return ad;
  }

  async delete(id: string): Promise<Ad> {
    const ad = await this.adModel.findOneAndDelete({ id });

    return ad;
  }
}
