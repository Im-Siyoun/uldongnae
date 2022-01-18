import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes';

import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { LandmarksService } from './landmarks.service';
import { Landmark } from './schemas/landmark.schema';

@Controller('/landmarks')
export class LandmarksController {
  constructor(private readonly landmarkService: LandmarksService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createLandmarkDto: CreateLandmarkDto,
  ): Promise<Landmark> {
    const landmark = await this.landmarkService.create(createLandmarkDto);

    return landmark;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Landmark[]> {
    return this.landmarkService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<Landmark> {
    return this.landmarkService.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateLandmarkDTO: UpdateLandmarkDto,
  ): Promise<Landmark> {
    return this.landmarkService.update(id, updateLandmarkDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<Landmark> {
    return this.landmarkService.delete(id);
  }
}
