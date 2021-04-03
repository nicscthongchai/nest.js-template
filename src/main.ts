import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppConfig } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      pug: require('pug'),
    },
    templates: join(__dirname, '..', 'views'),
  });
  const appService = app.get(AppService);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, '0.0.0.0', appService.onStartListener());
}

bootstrap();
