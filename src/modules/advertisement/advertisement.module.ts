import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdController } from './advertisement.controller';
import { AdService } from './advertisement.service';
import { Ad, AdSchema } from './schemas/advertisement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ad.name, schema: AdSchema },
    ]),
  ],
  controllers: [AdController],
  providers: [AdService],
  exports: [AdService],
})
export class AdModule {}
