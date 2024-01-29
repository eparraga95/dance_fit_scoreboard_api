import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDto: loginDto) {
        return this.authService.validatePlayer(loginDto)
    }
}
