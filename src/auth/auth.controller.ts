import { Body, Controller, Post,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './entities/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('/signup')
    sigup(@Body() sigupObj: User ): Promise<User>{
       return  this.authService.signUp(sigupObj);
    }

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{token: string}>{
        return this.authService.login(loginDto);
    }
}
