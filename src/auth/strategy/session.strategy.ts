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
    const username = session.get('username')
    const roles = session.get('roles')

    if (!username || !roles) {
      throw new UnauthorizedException()
    }

    return {
      username: req.session.get('username'),
      roles: req.session.get('roles'),
    }
  }
}
