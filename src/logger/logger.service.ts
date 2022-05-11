import {
  Injectable,
  LoggerService as CoreLoggerService,
  LogLevel,
  Scope,
} from '@nestjs/common';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { networkInterfaces } from 'os';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements CoreLoggerService {
  private levels: LogLevel[] = ['verbose', 'debug', 'log', 'warn', 'error'];
  private verbosePrefix = chalk.gray(
    `${process.pid.toString()} - ${chalk.bold('[Verbose]')} -`,
  );
  private debugPrefix = chalk.cyan(
    `${process.pid.toString()} - ${chalk.bold('[Debug]')}   -`,
  );
  private logPrefix = chalk.green(
    `${process.pid.toString()} - ${chalk.bold('[Log]')}     -`,
  );
  private warnPrefix = chalk.yellow(
    `${process.pid.toString()} - ${chalk.bold('[Warn]')}    -`,
  );
  private errorPrefix = chalk.red(
    `${process.pid.toString()} - ${chalk.bold('[Error]')}   -`,
  );

  private get timestamp() {
    return dayjs().tz().format('DD/MM/YYYY, H:mm:ss');
  }

  protected context?: string;

  setContext(context: string) {
    this.context = context;
  }

  setLogLevels(levels: LogLevel[] = this.levels) {
    this.levels = levels;
  }

  verbose(message: any, context?: string) {
    if (!this.levels.includes('verbose')) return;
    const ctx = chalk.yellow.bold(
      `[${context || this.context || LoggerService.name}]`,
    );
    console.log(this.verbosePrefix, this.timestamp, ctx, chalk.gray(message));
  }

  debug(message: any, context?: string) {
    if (!this.levels.includes('debug')) return;
    const ctx = chalk.yellow.bold(
      `[${context || this.context || LoggerService.name}]`,
    );
    console.log(this.debugPrefix, this.timestamp, ctx, chalk.cyan(message));
  }

  log(message: any, context?: string) {
    if (!this.levels.includes('log')) return;
    const ctx = chalk.yellow.bold(
      `[${context || this.context || LoggerService.name}]`,
    );
    console.log(this.logPrefix, this.timestamp, ctx, chalk.green(message));
  }

  warn(message: any, context?: string) {
    if (!this.levels.includes('warn')) return;
    const ctx = chalk.yellow.bold(
      `[${context || this.context || LoggerService.name}]`,
    );
    console.log(this.warnPrefix, this.timestamp, ctx, chalk.yellow(message));
  }

  error(message: any, _stack?: string, context?: string) {
    if (!this.levels.includes('error')) return;
    const ctx = chalk.yellow.bold(
      `[${context || this.context || LoggerService.name}]`,
    );
    console.log(this.errorPrefix, this.timestamp, ctx, chalk.red(message));
  }

  onApplicationStart(port: number) {
    const network = networkInterfaces();
    console.log('');
    this.verbose(`Enabled ${chalk.bold('verbose')} log`);
    this.debug(`Enabled ${chalk.bold('debug')} log`);
    this.log(`Enabled ${chalk.bold('log')} log`);
    this.warn(`Enabled ${chalk.bold('warn')} log`);
    this.error(`Enabled ${chalk.bold('error')} log`);
    console.log('');
    console.log(chalk.blue('Access URLs:'));
    console.log(chalk.gray('-------------------------------------'));
    console.log(
      Object.keys(network)
        .map((name) => ({
          ...network[name].find((info) => info.family === 'IPv4'),
          name,
        }))
        .filter((info) => info.address)
        .map((info) => {
          const { address } = info;
          const url = chalk.magenta(`http://${address}:${port}`);
          return `${info.name}: ${url}`;
        })
        .join('\n')
        .replace('127.0.0.1', 'localhost'),
    );
    console.log(chalk.gray('-------------------------------------'));
    console.log(chalk.blue(`Press ${chalk.italic.bold('CTRL+C')} to stop`));
    console.log('');
  }
}
