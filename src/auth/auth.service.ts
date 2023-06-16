import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './entities/login.dto';
@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService: JwtService){}

    async signUp(usr : User): Promise<User>{
        const {name, email, password}  = usr;

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = { ...usr, password: hashPassword }; 

        const user = await this.userService.create(newUser)

        return user
    }

    async login(loginDto : LoginDto):Promise<{token: string}> {
        const {email, password}  = loginDto;

        const usr = await this.userService.findOneByEmail(email);
        console.log(usr);
        if(!usr){
            throw new UnauthorizedException("cannot login");
        }

        const ifPasswordmatched =  await bcrypt.compare(password,usr.password);
        if(!ifPasswordmatched){
            throw new UnauthorizedException("cannot login");
        }

        const token = this.jwtService.sign({id: usr.email});
        
        return {token};
    }
}
