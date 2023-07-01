import { LogLevel } from '@nestjs/common';

export default class AppConfig {
  env = process.env.NODE_ENV || 'development';
  port = parseInt(process.env.PORT || '3000');
  logLevels: LogLevel[] = JSON.parse(
    process.env.LOG_LEVELS || '["verbose","debug","log","warn","error"]',
  );
}
