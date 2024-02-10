import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

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

    @UseGuards(AuthGuard)
    @Get('/session')
    async sessionAuth() {
        return true
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Get('/admin')
    async adminAuth() {
        return true
    }

}
