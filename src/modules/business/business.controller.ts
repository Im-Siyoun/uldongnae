import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes';

import { BusinessesService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Business } from './schemas/business.schema';

@Controller('/businesses')
export class BusinessesController {
  constructor(private businessesService: BusinessesService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createBusinessDto: CreateBusinessDto,
  ): Promise<Business> {
    const business = await this.businessesService.create(createBusinessDto);

    return business;
  }
}
