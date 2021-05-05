import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configuration, { MongoConfig } from './configuration'
import { UsersModule } from './users/users.module'

describe('AppController', () => {
  let controller: AppController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          inject: [ConfigService],
          async useFactory(config: ConfigService) {
            return config.get<MongoConfig>(MongoConfig.name)
          },
        }),
        UsersModule,
        AuthModule,
      ],
      providers: [AppService],
      controllers: [AppController],
    }).compile()

    controller = module.get<AppController>(AppController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
