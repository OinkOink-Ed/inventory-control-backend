import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SkipAuth } from '@common/decorators/SkipAuth';
import { AuthService } from '@Modules/auth/auth.service';
import { PostAuthDto } from '@Modules/auth/dto/PostAuthDto';
import { PostResponseAuthDto } from '@Modules/auth/dto/PostResponseAuthDto';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PostlogoutDto } from './dto/PostLogoutDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostRefreshDto } from './dto/PostRefreshDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: () => PostResponseAuthDto,
  })
  @ApiErrorResponses()
  async signIn(@Body() sighInDto: PostAuthDto): Promise<PostResponseAuthDto> {
    return await this.authService.signIn(
      sighInDto.username,
      sighInDto.password,
    );
  }

  @SkipAuth()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: () => PostRefreshDto,
  })
  @ApiErrorResponses()
  async refreshToken(
    @Body() refreshToken: PostRefreshDto,
  ): Promise<PostRefreshDto> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async logout(@Body() dto: PostlogoutDto) {
    return await this.authService.logout(dto);
  }
}
