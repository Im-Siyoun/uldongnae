import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from '../roles/role.enum';
import { UsersService } from '../users/users.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { CreateReportDto } from './dto/create-report.dto';
import {
  Announcement,
  AnnouncementDocument,
} from './schemas/announcement.schema';
import { Report, ReportDocument } from './schemas/report.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<AnnouncementDocument>,
    private userservice: UsersService,
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
  ) {}

  async create(announcementdto: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = {
      ...announcementdto,
    };
    const result = await this.announcementModel.create(announcement);

    return result;
  }

  async findbyCategory(category: string): Promise<Announcement[]> {
    const result = await this.announcementModel.find({
      category,
    });

    return result;
  }

  async promotion(id: string, role: Role): Promise<any> {
    const user = await this.userservice.find(id);
    const newuser = await this.userservice.update(id, {
      roles: user.roles.concat(role),
    });

    return newuser;
  }

  async report(reportdto: CreateReportDto): Promise<Report> {
    const report = { ...reportdto };
    const result = await this.reportModel.create(report);

    return result;
  }
}
