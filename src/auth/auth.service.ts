import { Injectable } from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
