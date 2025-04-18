import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from 'src/common/decorators/SkipAuth';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { AuthBaseResponseDto } from './dto/AuthBaseResponseDto';
import { AuthBaseRequestDto } from './dto/AuthBaseRequestDto';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AuthBaseResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: () => ErrorResponseDto,
  })
  async signIn(
    @Body() sighInDto: AuthBaseRequestDto,
  ): Promise<AuthBaseResponseDto | ErrorResponseDto> {
    return await this.authService.signIn(
      sighInDto.username,
      sighInDto.password,
    );
  }
}
