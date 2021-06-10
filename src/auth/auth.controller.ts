import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from './auth.service'
import { Principal } from './decorators/principal.decorator'
import { BasicAuthGuard } from './guards/basic-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthPrincipal } from './interfaces/auth-principal'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(BasicAuthGuard)
  @Get('/sign-in')
  signIn(
    @Principal() principal: AuthPrincipal,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query('r') redirect: string,
  ) {
    req.session.user = principal
    reply.status(HttpStatus.TEMPORARY_REDIRECT)
    reply.redirect(redirect || '/')
  }

  @Get('/sign-out')
  signOut(@Req() req: FastifyRequest, @Res() reply: FastifyReply, @Query('r') redirect: string) {
    if (req.session.user?.isAuthenticated) {
      req.destroySession((err) => {
        if (err) {
          reply.status(HttpStatus.INTERNAL_SERVER_ERROR)
          reply.send(new InternalServerErrorException())
        } else {
          reply.status(HttpStatus.TEMPORARY_REDIRECT)
          reply.redirect(redirect || '/')
        }
      })
    } else {
      reply.status(HttpStatus.TEMPORARY_REDIRECT)
      reply.redirect(redirect || '/')
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/token')
  @HttpCode(HttpStatus.OK)
  async getJwtToken(@Principal() principal: AuthPrincipal) {
    return {
      accessToken: await this.authService.signToken(principal),
    }
  }
}
