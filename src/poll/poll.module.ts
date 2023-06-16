import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [AuthModule],
  controllers: [PollController],
  providers: [PollService,JwtStrategy, UserService]
})
export class PollModule {}
