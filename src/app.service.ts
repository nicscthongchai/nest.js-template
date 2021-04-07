import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';
import { AppConfig } from './configs/app.config';

const firstUppercase = (text: string) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
};

const app = {
  _startedAt: new Date(),
  get startedAt() {
    return app._startedAt;
  },
};

export const startedAt = app.startedAt;

@Injectable()
export class AppService {
  constructor(public configService: ConfigService) {}

  getOnStartListener() {
    const config = this.configService.get<AppConfig>('app');
    const url = `http://localhost:${config.port}`;
    return () => {
      console.log('');
      console.log(chalk.bold('Access URLs:'));
      console.log(chalk.gray('-------------------------------------'));
      console.log(`${firstUppercase(config.env)}: ${chalk.magentaBright(url)}`);
      console.log(chalk.gray('-------------------------------------'));
      console.log(chalk.blueBright(`Press ${chalk.italic('CTRL+C')} to stop`));
      console.log('');
    };
  }
}
