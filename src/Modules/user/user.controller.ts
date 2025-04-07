import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ErrorResponse400,
  ErrorResponse403,
  ErrorResponse404,
  ErrorResponse408,
} from '../../common/errorTypes';
import { SuccessResponse200 } from 'src/common/successTypes';
import { ReadUserDto } from './dto/ReadUserDto';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Modules/user/dto/CreateUserDto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse200,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createDto: CreateUserDto) {
    await this.userService.create(createDto);
    return {
      statusCode: 200,
      message: 'Пользователь успешно добавлен',
    };
  }

  @Get()
  @ApiCreatedResponse({
    type: () => ReadUserDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  async getAll(): Promise<ReadUserDto[]> {
    return await this.userService.getAll();
  }
}
