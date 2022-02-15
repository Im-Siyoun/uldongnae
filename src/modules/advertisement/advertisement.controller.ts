import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes';

import { AuthService } from '../auth/auth.service';
import { AdService } from './advertisement.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './schemas/advertisement.schema';

@Controller('/ads')
export class AdController {
  constructor(
    private readonly adService: AdService,
    private readonly authservice: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Req() request: any,
    @Body(ValidationPipe) createAdDto: CreateAdDto,
  ): Promise<Ad> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);
    createAdDto.writer = json.id;

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
    @Req() request: any,
    @Param('id') id: string,
    @Body(ValidationPipe) updateAdDTO: UpdateAdDto,
  ): Promise<Ad> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    return this.adService.update(json.id, id, updateAdDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Req() request: any, @Param('id') id: string): Promise<Ad> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    return this.adService.delete(json.id, id);
  }
}
