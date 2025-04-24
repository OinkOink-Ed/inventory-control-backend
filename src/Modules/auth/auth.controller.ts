import { SkipAuth } from '@common/decorators/SkipAuth';
import { ErrorResponseDto } from '@common/dto/ErrorResponseDto';
import { AuthService } from '@Modules/auth/auth.service';
import { PostAuthDto } from '@Modules/auth/dto/PostAuthDto';
import { PostResponseAuthDto } from '@Modules/auth/dto/PostResponseAuthDto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: () => PostResponseAuthDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: () => ErrorResponseDto,
  })
  async signIn(@Body() sighInDto: PostAuthDto): Promise<PostResponseAuthDto> {
    return await this.authService.signIn(
      sighInDto.username,
      sighInDto.password,
    );
  }
}
