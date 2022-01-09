import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AppModule } from './app.module';
import {
  BadRequestExceptionFilter,
  HttpExceptionFilter,
  MongoExceptionFilter,
  UnauthorizedExceptionFilter,
} from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new HttpExceptionFilter(),
    new MongoExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  await app.listen(8000);
}
bootstrap();
