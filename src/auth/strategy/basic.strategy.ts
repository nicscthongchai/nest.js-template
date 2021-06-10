import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { Strategy } from 'passport-custom'
import { AuthService } from '../auth.service'
import { AuthPrincipal } from '../interfaces/auth-principal'
import { AuthHeader } from '../utils/auth-header'

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(req: FastifyRequest): Promise<AuthPrincipal> {
    const { headers } = req
    const { scheme, token } = AuthHeader(headers.authorization)
    if (scheme.toLowerCase() !== 'basic') {
      throw new UnauthorizedException()
    }
    const buffer = Buffer.from(token, 'base64')
    const parsed = buffer.toString('utf-8')
    const [username, password] = parsed.split(':')
    if (!username || !password) {
      throw new UnauthorizedException()
    }
    const identity = await this.authService.validateUser(username, password)
    return identity
  }
}
