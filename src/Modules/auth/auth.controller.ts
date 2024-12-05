import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/authRequestDto';
import { SkipAuth } from 'src/common/decorators/SkipAuth';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiRequestTimeoutResponse } from '@nestjs/swagger';
import { AccessAuthResponseDto } from './dto/accessAuthresponseDto';
import { ErrorResponse400, ErrorResponse403, ErrorResponse404, ErrorResponse408 } from 'src/common/errorTypes';

@SkipAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiCreatedResponse({
        type: AccessAuthResponseDto
    })
    @ApiBadRequestResponse({
        type: () => ErrorResponse400
      })
      @ApiRequestTimeoutResponse({
        type: () => ErrorResponse408
      })
    @ApiForbiddenResponse({
        type: () => ErrorResponse403
    })
    @ApiNotFoundResponse({
        type: () => ErrorResponse404
    })
    @HttpCode(HttpStatus.OK)
    async sighIn(@Body() sighInDto: AuthRequestDto) {
        return await this.authService.signIn(sighInDto.nickname, sighInDto.password)
    }
}
