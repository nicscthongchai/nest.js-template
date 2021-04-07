import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { join } from 'path'

dayjs.extend(relativeTime)

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )

    app.useStaticAssets({
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    })
    app.setViewEngine({
      engine: {
        pug: require('pug'),
      },
      templates: join(__dirname, '..', 'views'),
    })

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/',
    })
    expect(result.statusCode).toEqual(200)
    expect(typeof result.payload).toEqual(typeof '')
  })
})
