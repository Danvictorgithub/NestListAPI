import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }
    // Authenticates email and Password
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        const result = (user) ? bcrypt.compareSync(password, user.password) : false;
        if (user && result) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    // Returns JWT Bearer Token
    async login(user: any) {
        const payload = { email: user.email, id: user.id, profilePicture: user.profilePicture };
        return {
            // Calls Passport JWTStrategy
            access_token: this.jwtService.sign(payload)
        }
    }
}
