import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDto: loginDto) {
        return this.authService.validatePlayer(loginDto)
    }

    @UseGuards(AuthGuard)
    @Delete('/logout')
    async logout() {
        return this.authService.removeSession()
    }
}
