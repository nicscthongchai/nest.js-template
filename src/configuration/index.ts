import { LogLevel } from '@nestjs/common';

export class AppConfig {
  env: 'development' | 'test' | 'staging' | 'production';
  port: number;
  logLevels: LogLevel[];
}

export type Config = {
  AppConfig: AppConfig;
};

export default (): Config => ({
  AppConfig: {
    env: (process.env.NODE_ENV as Config['AppConfig']['env']) || 'development',
    port: parseInt(process.env.PORT || '3000'),
    logLevels: JSON.parse(
      process.env.LOG_LEVELS || '["verbose","debug","log","warn","error"]',
    ),
  },
});
