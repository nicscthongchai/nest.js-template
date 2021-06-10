import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalSessionStrategy } from './strategy/local-session.strategy'
import { SessionStrategy } from './strategy/session.strategy'
import { LocalJwtStrategy } from './strategy/local-jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthConfig } from 'src/configuration'
import { JwtStrategy } from './strategy/jwt.strategy'

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
  providers: [AuthService, SessionStrategy, LocalSessionStrategy, JwtStrategy, LocalJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
