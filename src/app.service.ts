import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import chalk from 'chalk'
import { AppConfig } from './configuration'

const firstUppercase = (text: string) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  public startedAt: Date = new Date()

  getOnStartListener() {
    console.log(AppConfig.name)
    const config = this.configService.get<AppConfig>(AppConfig.name)
    const url = `http://localhost:${config.port}`
    return () => {
      console.log('')
      console.log(chalk.bold('Access URLs:'))
      console.log(chalk.gray('-------------------------------------'))
      console.log(`${firstUppercase(config.env)}: ${chalk.magentaBright(url)}`)
      console.log(chalk.gray('-------------------------------------'))
      console.log(chalk.blueBright(`Press ${chalk.italic('CTRL+C')} to stop`))
      console.log('')
    }
  }
}
