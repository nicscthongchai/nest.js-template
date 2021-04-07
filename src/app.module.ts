import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import configuration, { MongoConfig } from './configuration'
import { UsersModule } from 'src/users/users.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return config.get<MongoConfig>(MongoConfig.name)
      },
    }),
    UsersModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
