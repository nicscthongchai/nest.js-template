import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AppModule } from './app.module';
import { AppConfig } from './configuration';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');

  const logger = new LoggerService();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger,
  });
  const configService = app.get<ConfigService<any, boolean>>(ConfigService);
  const { port, logLevels } = configService.get<AppConfig>(AppConfig.name);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  logger.setLogLevels(logLevels);

  await app.listen(port, '0.0.0.0', logger.onApplicationStart.bind(logger, port));
}
bootstrap();
