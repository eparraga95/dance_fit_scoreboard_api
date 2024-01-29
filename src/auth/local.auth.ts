import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { loginDto } from './dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor( private authService: AuthService) {
        super();
    }

    async validate(loginDetails: loginDto) {
        const player = await this.authService.validatePlayer(loginDetails)

        if(!player) {
            throw new UnauthorizedException()
        }
        return player
    }
}