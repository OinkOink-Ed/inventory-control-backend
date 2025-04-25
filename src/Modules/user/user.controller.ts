import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllUserDto } from '@Modules/user/dto/GetResponseAllUserDto';
import { PostCreateAdminDto } from '@Modules/user/dto/PostCreateAdminDto';
import { PostCreateUserDto } from '@Modules/user/dto/PostCreateUserDto';
import { UserService } from '@Modules/user/user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('admin')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createAdmin(
    @Body() createDto: PostCreateAdminDto,
  ): Promise<SuccessResponseDto> {
    return await this.userService.createAdmin(createDto);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createUser(
    @Body() createDto: PostCreateUserDto,
  ): Promise<SuccessResponseDto> {
    return await this.userService.createUser(createDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllUserDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetResponseAllUserDto[]> {
    return await this.userService.getAll();
  }
}
