import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { GatheringsController } from './gathering.controller';
import { GatheringService } from './gathering.service';
import { Gathering, GatheringSchema } from './schemas/gathering.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gathering.name, schema: GatheringSchema },
    ]),
    AuthModule,
  ],
  controllers: [GatheringsController],
  providers: [GatheringService],
  exports: [GatheringService],
})
export class GatheringsModule {}
