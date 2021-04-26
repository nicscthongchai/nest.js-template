import { MongooseModuleOptions } from '@nestjs/mongoose'

export class AppConfig {
  env: 'development' | 'test' | 'staging' | 'production'
  port: number
  enableIndexPage: boolean
}

export class AuthConfig {
  sessionKey: string
  saltRound: number
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
    sessionKey:
      process.env.SESSION_KEY ||
      '54930a9d286eb2e52cf63521fb8aff4dbd55116ca049c13a7acc145852c1f2f0',
    saltRound: parseInt(process.env.SALT_ROUND || '10'),
  },
  MongoConfig: {
    uri: process.env.MONGO_URI || 'mongodb://localhost',
    dbName: process.env.DB_NAME || 'test',
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
})
