import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from 'src/common/decorators/SkipAuth';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/AuthResponseDto';
import { AuthRequestDto } from 'src/Modules/auth/dto/AuthRequestDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: () => AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: () => ErrorResponseDto,
  })
  async signIn(@Body() sighInDto: AuthRequestDto) {
    return await this.authService.signIn(
      sighInDto.username,
      sighInDto.password,
    );
  }
}
