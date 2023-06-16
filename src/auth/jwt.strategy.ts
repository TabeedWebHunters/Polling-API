import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport';
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService: UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SUPABASE_JWT_SECRET
        })
    }

    async validate(payload) {
        const {id} = payload;

        const usr = await this.userService.findOneByEmail(id);
        if (!usr){
            throw new UnauthorizedException("Login first to access the endpoint")
        }
        return usr;
    }
}