import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as joi from 'joi';

import { AdModule } from './modules/advertisement/advertisement.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessesModule } from './modules/business/business.module';
import { CommentsModule } from './modules/comments/comments.module';
import { EventsModule } from './modules/events/events.module';
import { GatheringsModule } from './modules/gathering/gathering.module';
import { LandmarksModule } from './modules/landmarks/landmarks.module';
import { AdminModule } from './modules/management/management.module';
import { PostsModule } from './modules/post/posts.module';
import { RolesGuard } from './modules/roles/roles.guard';
import { RolesModule } from './modules/roles/roles.module';
import { TransactionsModule } from './modules/transaction/transacton.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AdModule,
    UsersModule,
    BusinessesModule,
    PostsModule,
    AuthModule,
    RolesModule,
    EventsModule,
    TransactionsModule,
    CommentsModule,
    AdminModule,
    LandmarksModule,
    GatheringsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: joi.object({
        NODE_ENV: joi
          .string()
          .valid('development', 'production', 'test')
          .required(),
        DB_URI: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        GOOGLE_API_KEY: joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
