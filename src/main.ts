import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { join } from 'path'
import { AppModule } from './app/app.module'
import { AppService } from './app/app.service'
import { AppConfig } from './configs/app.config'

async function bootstrap() {
  dayjs.extend(relativeTime)

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  )
  const appService = app.get(AppService)
  const configService = app.get(ConfigService)
  const appConfig = configService.get<AppConfig>('app')

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  })
  app.setViewEngine({
    engine: {
      pug: require('pug'),
    },
    templates: join(__dirname, '..', 'views'),
  })

  await app.listen(appConfig.port, '0.0.0.0', appService.getOnStartListener())
}

bootstrap()
