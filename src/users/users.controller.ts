import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Principal } from 'src/auth/decorators/principal.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthPrincipal } from 'src/auth/interfaces/auth-principal'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Principal() principal: AuthPrincipal) {
    const { username } = principal
    const user = await this.usersService.findByUsername(username, {
      password: false,
    })
    return user
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.usersService.create(dto)
  }
}
