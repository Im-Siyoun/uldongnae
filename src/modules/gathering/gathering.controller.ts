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
import { CreateGatheringDto } from './dto/create-gathering.dto';
import { UpdateGatheringDto } from './dto/update-gathering.dto';
import { GatheringService } from './gathering.service';
import { Gathering } from './schemas/gathering.schema';

@Controller('/gatherings')
export class GatheringsController {
  constructor(
    private readonly gatheringService: GatheringService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createGatheringDto: CreateGatheringDto,
    @Req() request: any,
  ): Promise<Gathering> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);
    createGatheringDto.writer = json.user._id;

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
    @Req() request: any,
    @Param('id') id: string,
    @Body(ValidationPipe) updateGatheringDTO: UpdateGatheringDto,
  ): Promise<Gathering> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.gatheringService.update(json.id, id, updateGatheringDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(
    @Req() request: any,
    @Param('id') id: string,
  ): Promise<Gathering> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.gatheringService.delete(json.id, id);
  }
}
