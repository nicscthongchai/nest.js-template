import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import configuration, { MongoConfig } from 'src/configuration'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategy/local.strategy'
import { SessionStrategy } from './strategy/session.strategy'

describe('AuthService', () => {
  let service: AuthService

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
        PassportModule,
        UsersModule,
      ],
      providers: [AuthService, SessionStrategy, LocalStrategy],
      controllers: [AuthController],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
