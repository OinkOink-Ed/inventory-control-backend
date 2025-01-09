import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/authRequestDto';
import { SkipAuth } from 'src/common/decorators/SkipAuth';
import { ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessAuthResponseDto } from './dto/accessAuthresponseDto';
import { } from 'src/common/errorTypes';

@SkipAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiCreatedResponse({
        type: AccessAuthResponseDto
    })

    //Разобраться бы как типизировать ошибки правильно
    //Пока что так, чтобы после того, как kubb забирал типы из swagger на клиенте, у меня TS не ругался на то, что Errors идёт как any

    @ApiUnauthorizedResponse({
        type: () => UnauthorizedException
    })

    @HttpCode(HttpStatus.OK)
    async sighIn(@Body() sighInDto: AuthRequestDto) {
        return await this.authService.signIn(sighInDto.nickname, sighInDto.password)
    }
}
