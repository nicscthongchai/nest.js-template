import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { Strategy } from 'passport-custom'
import { AuthPrincipal } from '../interfaces/auth-principal'

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
  constructor() {
    super()
  }

  async validate(req: FastifyRequest): Promise<AuthPrincipal> {
    const { session } = req

    if (!session || !session.user) {
      throw new UnauthorizedException()
    }

    const username = session.user.username
    const roles = session.user.roles

    if (!username || !roles) {
      throw new UnauthorizedException()
    }

    return {
      isAuthenticated: true,
      username,
      roles,
    }
  }
}
