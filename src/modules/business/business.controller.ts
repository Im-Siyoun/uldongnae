import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes';

import { AuthService } from '../auth/auth.service';
import { BusinessesService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Business } from './schemas/business.schema';

@Controller('/businesses')
export class BusinessesController {
  constructor(
    private businessesService: BusinessesService,
    private authservice: AuthService,
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) createBusinessDto: CreateBusinessDto,
    @Req() request: any,
  ): Promise<Business> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);
    createBusinessDto.owner = json.id;

    const business = await this.businessesService.create(createBusinessDto);

    return business;
  }

  @Get()
  async findAll(): Promise<Business[]> {
    return this.businessesService.findAll();
  }

  @Get('/:id')
  async find(@Param('id') id: string): Promise<Business> {
    return this.businessesService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBusinessDTO: CreateBusinessDto,
  ): Promise<Business> {
    return this.businessesService.update(id, updateBusinessDTO);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Business> {
    return this.businessesService.delete(id);
  }
}
