import { Controller, Get, HttpCode, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from './auth.service'
import { LocalJwtAuthGuard } from './guards/local-jwt-auth.guard'
import { LocalSessionAuthGuard } from './guards/local-session-auth.guard'
import { SessionAuthGuard } from './guards/session-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalSessionAuthGuard)
  @Post('/sign-in')
  @HttpCode(200)
  signIn() {
    return
  }

  @UseGuards(SessionAuthGuard)
  @Get('/sign-out')
  signOut(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    if (req.session.user) {
      req.destroySession((err) => {
        if (err) {
          reply.status(500)
          reply.send(new InternalServerErrorException())
        } else {
          reply.send()
        }
      })
    } else {
      reply.send()
    }
  }

  @UseGuards(LocalJwtAuthGuard)
  @Post('/jwt')
  @HttpCode(200)
  async getJwtToken(@Req() req: FastifyRequest) {
    const user = req['user']
    return {
      accessToken: await this.authService.signToken(user),
    }
  }
}
