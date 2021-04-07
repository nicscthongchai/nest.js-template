import { Controller, Get, Render } from '@nestjs/common'
import dayjs from 'dayjs'
import { startedAt } from './app.service'

@Controller('')
export class AppController {
  @Get()
  @Render('index.pug')
  async index() {
    return {
      appName: 'NestJS',
      since: `<small>Since</small> ${dayjs(startedAt).format(
        'DD MMMM YYYY, HH:mm',
      )} (${dayjs().to(startedAt)})`,
    }
  }
}
