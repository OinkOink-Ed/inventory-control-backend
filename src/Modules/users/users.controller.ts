import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatedResponseUserDto, CreateUserDto } from './dto/createUserDto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  // @ApiCreatedResponse({
  //   type: CreatedResponseUserDto
  // })

  @HttpCode(HttpStatus.OK)
  async create(@Body() createDto: CreateUserDto) {
    await this.usersService.create(createDto);
  };

  @Get()
  @ApiCreatedResponse({
    type: CreatedResponseUserDto
  })

  async getAll(): Promise<CreatedResponseUserDto[]> {
    return await this.usersService.getAll();
  }
};