import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { FastifyRequest } from 'fastify'

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(Strategy, 'local-jwt') {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true })
  }

  async validate(request: FastifyRequest, username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
