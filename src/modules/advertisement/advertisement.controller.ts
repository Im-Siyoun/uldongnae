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

import { AdService } from './advertisement.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './schemas/advertisement.schema';

@Controller('/ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  @HttpCode(201)
  async create(@Body(ValidationPipe) createAdDto: CreateAdDto): Promise<Ad> {
    const ad = await this.adService.create(createAdDto);

    return ad;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Ad[]> {
    return this.adService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<Ad> {
    return this.adService.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAdDTO: UpdateAdDto,
  ): Promise<Ad> {
    return this.adService.update(id, updateAdDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<Ad> {
    return this.adService.delete(id);
  }
}
