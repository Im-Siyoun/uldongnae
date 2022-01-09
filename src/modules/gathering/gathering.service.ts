import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateGatheringDto } from './dto/create-gathering.dto';
import { Gathering, GatheringDocument } from './schemas/gathering.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Gathering.name)
    private gatheringModel: Model<GatheringDocument>,
  ) {}

  async create(gatheringdto: CreateGatheringDto): Promise<Gathering> {
    const gathering = {
      ...gatheringdto,
    };
    const result = await this.gatheringModel.create(gathering);

    return result;
  }

  async findAll(): Promise<Gathering[]> {
    const gatherings = await this.gatheringModel.find();

    return gatherings;
  }

  async find(id: string): Promise<Gathering> {
    const gathering = await this.gatheringModel.findOne({ id });
    if (!gathering) {
      throw new Error('Gathering not found');
    }

    return gathering;
  }

  async findByOriginalId(original: ObjectId): Promise<Gathering> {
    const gathering = await this.gatheringModel.findOne({ original });
    if (!gathering) {
      throw new Error('Gathering not found');
    }

    return gathering;
  }

  async update(
    id: string,
    gatheringdto: UpdateGatheringDto,
  ): Promise<Gathering> {
    const gathering = await this.gatheringModel.findOneAndUpdate(
      { id },
      gatheringdto,
    );

    return gathering;
  }
}
