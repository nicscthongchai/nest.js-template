import { MongooseModuleOptions } from '@nestjs/mongoose'

export class AppConfig {
  env: 'development' | 'test' | 'staging' | 'production'
  port: number
  enableIndexPage: boolean
}

export class MongoConfig implements MongooseModuleOptions {
  uri: string
}

export type Config = {
  AppConfig: AppConfig
  MongoConfig: MongoConfig & MongooseModuleOptions
}

export default (): Config => ({
  AppConfig: {
    env: (process.env.NODE_ENV as Config['AppConfig']['env']) || 'development',
    port: parseInt(process.env.PORT || '3000'),
    enableIndexPage: true,
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
