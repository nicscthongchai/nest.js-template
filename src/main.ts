import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import secureSession from 'fastify-secure-session'
import { join } from 'path'
import { AppModule } from './app.module'
import { AppService } from './app.service'
import { AppConfig, AuthConfig } from './configuration'

async function bootstrap() {
  dayjs.extend(relativeTime)

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  )
  const appService = app.get(AppService)
  const configService = app.get(ConfigService)
  const appConfig = configService.get<AppConfig>(AppConfig.name)
  const authConfig = configService.get<AuthConfig>(AuthConfig.name)

  app.useGlobalPipes(new ValidationPipe())

  app.register(secureSession, {
    key: Buffer.from(authConfig.sessionKey, 'hex'),
    cookieName: '_ss',
    cookie: {
      path: '/',
      httpOnly: true,
    },
  })

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
