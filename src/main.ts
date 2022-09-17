if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
