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

import { CreateGatheringDto } from './dto/create-gathering.dto';
import { UpdateGatheringDto } from './dto/update-gathering.dto';
import { GatheringService } from './gathering.service';
import { Gathering } from './schemas/gathering.schema';

@Controller('/gatherings')
export class GatheringsController {
  constructor(private readonly gatheringService: GatheringService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createGatheringDto: CreateGatheringDto,
  ): Promise<Gathering> {
    const gathering = await this.gatheringService.create(createGatheringDto);

    return gathering;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Gathering[]> {
    return this.gatheringService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<Gathering> {
    return this.gatheringService.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGatheringDTO: UpdateGatheringDto,
  ): Promise<Gathering> {
    return this.gatheringService.update(id, updateGatheringDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<Gathering> {
    return this.gatheringService.delete(id);
  }
}
