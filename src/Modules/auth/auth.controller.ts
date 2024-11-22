import { Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/authRequestDto';
import { SkipAuth } from 'src/common/decorators/SkipAuth';

@SkipAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    sighIn(@Body() sighInDto: AuthRequestDto) {
        return this.authService.signIn(sighInDto.nickname, sighInDto.password)
    }
}
