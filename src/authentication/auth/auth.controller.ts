import { Controller, Post, Get, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly prisma: PrismaService) { }
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req): any {
        return this.authService.login(req.user);
    }
    @Get('validate')
    @UseGuards(JwtAuthGuard)
    async protected(@Request() req): Promise<any> {
        return req.user;
    }
}
