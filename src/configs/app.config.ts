import { registerAs } from '@nestjs/config'

export type AppConfig = {
  env: 'development' | 'test' | 'staging' | 'production'
  port: number
}

export default registerAs<() => AppConfig>('app', () => ({
  env: (process.env.NODE_ENV as AppConfig['env']) || 'development',
  port: parseInt(process.env.PORT || '3000'),
}))
