import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { AdController } from './advertisement.controller';
import { AdService } from './advertisement.service';
import { Ad, AdSchema } from './schemas/advertisement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
    AuthModule,
  ],
  controllers: [AdController],
  providers: [AdService],
  exports: [AdService],
})
export class AdModule {}
