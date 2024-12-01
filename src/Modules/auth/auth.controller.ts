import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/authRequestDto';
import { SkipAuth } from 'src/common/decorators/SkipAuth';
import { ApiCreatedResponse } from '@nestjs/swagger';

@SkipAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiCreatedResponse({
        type: null
    })
    @HttpCode(HttpStatus.OK)
    sighIn(@Body() sighInDto: AuthRequestDto) {
        return this.authService.signIn(sighInDto.nickname, sighInDto.password)
    }
}
