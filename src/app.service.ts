import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import chalk from 'chalk'
import { networkInterfaces } from 'os'
import { AppConfig } from './configuration'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  public startedAt: Date = new Date()

  getOnStartListener() {
    const config = this.configService.get<AppConfig>(AppConfig.name)
    const network = networkInterfaces()
    return () => {
      console.log('')
      console.log(chalk.bold('Access URLs:'))
      console.log(chalk.gray('-------------------------------------'))
      console.log(
        Object.keys(network)
          .map((name) => ({
            ...network[name].find((info) => info.family === 'IPv4'),
            name,
          }))
          .filter((info) => info.address)
          .map((info) => {
            const { address } = info
            const url = chalk.magentaBright(`http://${address}:${config.port}`)
            return `${info.name}: ${url}`
          })
          .join('\n')
          .replace('127.0.0.1', 'localhost'),
      )
      console.log(chalk.gray('-------------------------------------'))
      console.log(chalk.blueBright(`Press ${chalk.italic('CTRL+C')} to stop`))
      console.log('')
    }
  }
}
