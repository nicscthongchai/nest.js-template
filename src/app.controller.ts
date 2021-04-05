import { Controller, Get, Render } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  @Render('index.pug')
  async index() {
    return {
      message: `<b>Hello, world! I'm the immortal.</b>`,
    };
  }
}
