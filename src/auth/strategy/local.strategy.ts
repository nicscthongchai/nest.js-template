import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { FastifyRequest } from 'fastify'
import { AuthPrincipal } from '../interfaces/auth-principal'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true })
  }

  async validate(request: FastifyRequest, username: string, password: string): Promise<AuthPrincipal> {
    console.log(username, password)
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
