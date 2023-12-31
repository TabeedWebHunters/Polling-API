import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollModule } from './poll/poll.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), PollModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
