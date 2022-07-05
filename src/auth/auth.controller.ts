import {Body, Controller, HttpCode, HttpStatus, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginUserDto} from './dto/login-user.dto';
import {User} from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('registration')
    registration(@Body() user: User) {
        return this.authService.registration(user);
    }

    @Post('login')
    login(@Body() user: LoginUserDto) {
        return this.authService.login(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refresh(@Req() request) {
        const header = request.rawHeaders[1];
        const refreshToken = header.split(' ')[1];
        return this.authService.refresh(refreshToken);
    }

}
