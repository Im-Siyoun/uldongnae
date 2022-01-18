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

import { CreateFAQDto } from './dto/create-FAQ.dto';
import { UpdateFAQDto } from './dto/update-FAQ.dto';
import { FAQService } from './FAQ.service';
import { FAQ } from './schemas/FAQ.schema';

@Controller('/FAQ')
export class FAQsController {
  constructor(private readonly FAQservice: FAQService) {}

  @Post()
  @HttpCode(201)
  async create(@Body(ValidationPipe) createFAQDto: CreateFAQDto): Promise<FAQ> {
    const data = await this.FAQservice.create(createFAQDto);

    return data;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<FAQ[]> {
    return this.FAQservice.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<FAQ> {
    return this.FAQservice.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFAQDTO: UpdateFAQDto,
  ): Promise<FAQ> {
    return this.FAQservice.update(id, updateFAQDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<FAQ> {
    return this.FAQservice.delete(id);
  }
}
