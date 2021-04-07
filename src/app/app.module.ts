import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import appConfig from '../configs/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
