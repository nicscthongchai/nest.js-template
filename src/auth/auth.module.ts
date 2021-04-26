import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategy/local.strategy'
import { SessionStrategy } from './strategy/session.strategy'

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, SessionStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
