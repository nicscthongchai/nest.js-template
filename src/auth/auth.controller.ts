import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(200)
  signIn() {
    return
  }
}
