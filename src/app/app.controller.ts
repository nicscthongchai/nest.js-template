import { Controller, Get, NotFoundException, Render } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import dayjs from 'dayjs'
import { AppConfig } from 'src/configuration'
import { AppService } from './app.service'

@Controller('')
export class AppController {
  constructor(private config: ConfigService, private appService: AppService) {}

  @Get()
  @Render('index.pug')
  async index() {
    const appConfig = this.config.get<AppConfig>('app')
    if (!appConfig.enableIndexPage) {
      throw new NotFoundException('Cannot GET /')
    }

    const { startedAt } = this.appService

    return {
      appName: 'NestJS',
      since: `<small>Since</small> ${dayjs(startedAt).format(
        'DD MMMM YYYY, HH:mm',
      )} (${dayjs().to(startedAt)})`,
    }
  }
}
