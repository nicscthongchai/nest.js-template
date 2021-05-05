import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(200)
  signIn() {
    return
  }

  @Get('/sign-out')
  signOut(@Req() req: FastifyRequest) {
    req.session
    return
  }
}
