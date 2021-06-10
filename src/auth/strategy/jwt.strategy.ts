import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthConfig } from 'src/configuration'
import { AuthPrincipal } from '../interfaces/auth-principal'
import { AuthIdentity } from '../interfaces/auth-identity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>(AuthConfig.name).secret,
    })
  }

  async validate(payload: AuthIdentity): Promise<AuthPrincipal> {
    return { isAuthenticated: true, ...payload }
  }
}
