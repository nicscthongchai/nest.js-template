import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { Strategy } from 'passport-custom'

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
  constructor() {
    super()
  }

  async validate(req: FastifyRequest) {
    const { session } = req

    const username = session.username
    const roles = session.roles

    if (!username || !roles) {
      throw new UnauthorizedException()
    }

    return {
      username,
      roles,
    }
  }
}
