import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { Landmark, LandmarkDocument } from './schemas/landmark.schema';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectModel(Landmark.name)
    private readonly landmarkModel: Model<LandmarkDocument>,
  ) {}

  async create(landmarkdto: CreateLandmarkDto): Promise<Landmark> {
    const landmark = {
      ...landmarkdto,
    };
    const result = await this.landmarkModel.create(landmark);

    return result;
  }

  async findAll(): Promise<Landmark[]> {
    const landmarks = await this.landmarkModel.find();

    return landmarks;
  }

  async find(id: string): Promise<Landmark> {
    const landmark = await this.landmarkModel.findOne({ id });
    if (!landmark) {
      throw new Error('Landmark not found');
    }

    return landmark;
  }

  async update(id: string, landmarkdto: UpdateLandmarkDto): Promise<Landmark> {
    const landmark = await this.landmarkModel.findOneAndUpdate(
      { id },
      landmarkdto,
    );

    return landmark;
  }

  async delete(id: string): Promise<Landmark> {
    const landmark = await this.landmarkModel.findOneAndDelete({ id });

    return landmark;
  }
}
