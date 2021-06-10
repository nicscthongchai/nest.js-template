import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { AuthPrincipal } from './interfaces/auth-principal'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<AuthPrincipal> {
    const user = await this.usersService.findByUsername(username)
    if (!user) {
      return { isAuthenticated: false, username: '', roles: [] }
    }
    if (!compareSync(password, user.password)) {
      return { isAuthenticated: false, username: '', roles: [] }
    }
    return { isAuthenticated: true, username, roles: user.roles }
  }

  async signToken({ username, roles }: AuthPrincipal) {
    const payload = {
      username,
      roles,
    }
    return this.jwtService.sign(payload)
  }
}
