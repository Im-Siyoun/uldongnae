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
      throw new Error('광고를 찾을 수 없습니다.');
    }

    return ad;
  }

  async findByWriter(writer: string): Promise<Ad> {
    const ad = await this.adModel.findOne({ writer });
    if (!ad) {
      throw new Error('광고를 찾을 수 없습니다.');
    }

    return ad;
  }

  async update(userid: string, id: string, addto: UpdateAdDto): Promise<Ad> {
    const ad = await this.adModel.findOne({ id });
    if (!ad) {
      throw new Error('광고를 찾을 수 없습니다.');
    } else if (ad.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.adModel.findOneAndUpdate(
      { id },
      addto,
    );

    return result;
  }

  async delete(userid: string, id: string): Promise<Ad> {
    const ad = await this.adModel.findOne({ id });
    if (!ad) {
      throw new Error('광고를 찾을 수 없습니다.');
    } else if (ad.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.adModel.findOneAndDelete({ id });

    return result;
  }
}
