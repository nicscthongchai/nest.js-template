import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { FastifyRequest } from 'fastify'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true })
  }

  async validate(
    request: FastifyRequest,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    request.session.set('username', user.username)
    request.session.set('roles', user.roles)
    return user
  }
}
