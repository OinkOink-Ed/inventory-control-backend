import { HttpCode, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessAuthResponseDto } from './dto/accessAuthresponseDto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    @HttpCode(HttpStatus.OK)
    async signIn(nickname: string, pass: string): Promise<AccessAuthResponseDto> {
        const user = await this.usersService.findOne(nickname);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        return {
            access_token: await this.jwtService.signAsync({ sub: user.id }),
            profile: { ...user }
        }
    }
}
