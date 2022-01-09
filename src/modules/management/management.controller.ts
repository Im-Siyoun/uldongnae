import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Role } from 'src/modules/roles/role.enum';
import { Roles } from 'src/modules/roles/roles.decorator';
import { ValidationPipe } from 'src/pipes';

import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { AdminService } from './management.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private readonly words = [];

  @Post('/main')
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) announcement: CreateAnnouncementDto,
  ): Promise<any> {
    const announce = await this.adminService.create(announcement);

    return announce;
  }

  @Get('/main/:category')
  @HttpCode(200)
  async get(@Param('category') category: string): Promise<any> {
    const announce = await this.adminService.findbyCategory(category);

    return announce;
  }

  @Post('/word')
  @HttpCode(201)
  async addWord(@Body() word: string): Promise<any> {
    this.words.push(word);

    return this.words;
  }

  @Patch('/promote/:id')
  @HttpCode(200)
  async promote(@Param('id') id: string, role: number): Promise<any> {
    const result = await this.adminService.promotion(id, role);

    return result;
  }

  @Post('/report')
  @HttpCode(201)
  async report(@Body(ValidationPipe) reportdto: CreateReportDto): Promise<any> {
    const report = await this.adminService.report(reportdto);

    return report;
  }
}
