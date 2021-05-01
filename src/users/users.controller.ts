import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(SessionAuthGuard)
  @Get('me')
  async me(@Session() session: FastifyRequest['session']) {
    const { username } = session.user
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
