import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/modules/users/users.module';

import { FAQsController } from './FAQ.controller';
import { FAQService } from './FAQ.service';
import { AdminController } from './management.controller';
import { AdminService } from './management.service';
import {
  Announcement,
  AnnouncementSchema,
} from './schemas/announcement.schema';
import { FAQ, FAQSchema } from './schemas/FAQ.schema';
import { Report, ReportSchema } from './schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
      { name: Report.name, schema: ReportSchema },
      { name: FAQ.name, schema: FAQSchema },
    ]),
    UsersModule,
  ],
  controllers: [AdminController, FAQsController],
  providers: [AdminService, FAQService],
  exports: [AdminService],
})
export class AdminModule {}
