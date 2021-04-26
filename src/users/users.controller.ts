import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(SessionAuthGuard)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.usersService.create(dto)
  }
}
