import { MongooseModuleOptions } from '@nestjs/mongoose'

export class AppConfig {
  env: 'development' | 'test' | 'staging' | 'production'
  port: number
  enableIndexPage: boolean
}

export class AuthConfig {
  cookieSecret: string
  saltRound: number
  redis: {
    host: string
    port: number
    password?: string
  }
}

export class MongoConfig implements MongooseModuleOptions {
  uri: string
}

export type Config = {
  AppConfig: AppConfig
  AuthConfig: AuthConfig
  MongoConfig: MongoConfig & MongooseModuleOptions
}

export default (): Config => ({
  AppConfig: {
    env: (process.env.NODE_ENV as Config['AppConfig']['env']) || 'development',
    port: parseInt(process.env.PORT || '3000'),
    enableIndexPage: true,
  },
  AuthConfig: {
    cookieSecret:
      process.env.COOKIE_SECRET ||
      '54930a9d286eb2e52cf63521fb8aff4dbd55116ca049c13a7acc145852c1f2f0',
    saltRound: parseInt(process.env.SALT_ROUND || '10'),
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
  },
  MongoConfig: {
    uri: process.env.MONGO_URI || 'mongodb://localhost',
    dbName: process.env.MONGO_DB_NAME || 'test',
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
})
