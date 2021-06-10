import { Body, Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: FastifyRequest) {
    const { username } = req['user']
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
