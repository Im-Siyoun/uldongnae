import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateFAQDto } from './dto/create-FAQ.dto';
import { UpdateFAQDto } from './dto/update-FAQ.dto';
import { FAQ, FAQDocument } from './schemas/FAQ.schema';

@Injectable()
export class FAQService {
  constructor(
    @InjectModel(FAQ.name)
    private FAQModel: Model<FAQDocument>,
  ) {}

  async create(FAQdto: CreateFAQDto): Promise<FAQ> {
    const data = {
      ...FAQdto,
    };
    const result = await this.FAQModel.create(data);

    return result;
  }

  async findAll(): Promise<FAQ[]> {
    const FAQs = await this.FAQModel.find();

    return FAQs;
  }

  async find(id: string): Promise<FAQ> {
    const data = await this.FAQModel.findOne({ id });
    if (!data) {
      throw new Error('FAQ not found');
    }

    return data;
  }

  async update(id: string, FAQdto: UpdateFAQDto): Promise<FAQ> {
    const data = await this.FAQModel.findOneAndUpdate({ id }, FAQdto);

    return data;
  }

  async delete(id: string): Promise<FAQ> {
    const data = await this.FAQModel.findOneAndDelete({ id });

    return data;
  }
}
