import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { JwtPayload } from './interfaces/jwt-payload'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username)

    if (!user) {
      return null
    }

    if (!compareSync(password, user.password)) {
      return null
    }

    return { username, roles: user.roles }
  }

  async signToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }
}
