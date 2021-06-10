import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { SessionStrategy } from './strategy/session.strategy'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthConfig } from 'src/configuration'
import { JwtStrategy } from './strategy/jwt.strategy'
import { BasicStrategy } from './strategy/basic.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        const { secret: cookieSecret, signOptions } = config.get<AuthConfig>(AuthConfig.name)
        return { secret: cookieSecret, signOptions }
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, BasicStrategy, LocalStrategy, JwtStrategy, SessionStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
