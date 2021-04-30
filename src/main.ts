import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import connectRedis from 'connect-redis'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'
import { join } from 'path'
import { createClient as createRedisClient } from 'redis'
import { AppModule } from './app.module'
import { AppService } from './app.service'
import { AppConfig, AuthConfig } from './configuration'

async function bootstrap() {
  dayjs.extend(relativeTime)

  const RedisStore = connectRedis(fastifySession)

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  )
  const appService = app.get(AppService)
  const configService = app.get(ConfigService)
  const appConfig = configService.get<AppConfig>(AppConfig.name)
  const authConfig = configService.get<AuthConfig>(AuthConfig.name)

  app.useGlobalPipes(new ValidationPipe())

  app.register(fastifyCookie)

  app.register(fastifySession, {
    secret: authConfig.sessionKey,
    store: new RedisStore({
      client: createRedisClient({}),
    }),
    cookieName: '__ss',
    cookie: {
      secure: appConfig.env !== 'development',
      httpOnly: true,
      path: '/',
      maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
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
