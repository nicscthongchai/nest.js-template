import { Injectable, ConsoleLogger, Scope } from '@nestjs/common'
import chalk from 'chalk'
import dayjs from 'dayjs'
import { networkInterfaces } from 'os'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  protected getTimestamp(): string {
    return dayjs().tz().format('DD/MM/YYYY, H:mm:ss:SSS')
  }

  onApplicationStart(port: number) {
    const network = networkInterfaces()
    console.log('')
    this.verbose(`Enabled ${chalk.bold('verbose')} log`)
    this.debug(`Enabled ${chalk.bold('debug')}   log`)
    this.log(`Enabled ${chalk.bold('log')}     log`)
    this.warn(`Enabled ${chalk.bold('warn')}    log`)
    this.error(`Enabled ${chalk.bold('error')}   log`)
    console.log('')
    console.log(chalk.blue('Access URLs:'))
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
          const url = chalk.magenta(`http://${address}:${port}`)
          return `${info.name}: ${url}`
        })
        .join('\n')
        .replace('127.0.0.1', 'localhost'),
    )
    console.log(chalk.gray('-------------------------------------'))
    console.log(chalk.blue(`Press ${chalk.italic.bold('CTRL+C')} to stop`))
    console.log('')
  }
}
