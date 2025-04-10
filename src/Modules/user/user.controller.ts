import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReadUserDto } from './dto/ReadUserDto';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Modules/user/dto/CreateUserDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  async create(@Body() createDto: CreateUserDto) {
    await this.userService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Пользователь успешно добавлен',
    };
  }

  @Get()
  @ApiCreatedResponse({
    type: () => ReadUserDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  async getAll(): Promise<ReadUserDto[]> {
    return await this.userService.getAll();
  }
}
