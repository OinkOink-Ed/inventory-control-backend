import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from 'src/common/decorators/SkipAuth';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { PostResponseAuthDto } from './dto/PostResponseAuthDto';
import { PostAuthDto } from './dto/PostAuthDto';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => PostResponseAuthDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: () => ErrorResponseDto,
  })
  async signIn(
    @Body() sighInDto: PostAuthDto,
  ): Promise<PostResponseAuthDto | ErrorResponseDto> {
    return await this.authService.signIn(
      sighInDto.username,
      sighInDto.password,
    );
  }
}
