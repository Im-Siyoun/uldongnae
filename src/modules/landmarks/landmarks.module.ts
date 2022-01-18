import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';
import { Landmark, LandmarkSchema } from './schemas/landmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Landmark.name, schema: LandmarkSchema },
    ]),
  ],
  controllers: [LandmarksController],
  providers: [LandmarksService],
  exports: [LandmarksService],
})
export class LandmarksModule {}
