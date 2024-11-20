import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { CreateUserDto } from './dto/createUserDto';
import { CreateOK } from './types';

@Controller('create-user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) { }

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<CreateOK> {
    try {
      await this.createUserService.create(createDto) as unknown as Promise<CreateUserDto>;

      return { message: "Пользователь успешно создан", status: HttpStatus.OK }
    } catch (error: any) {
      throw new HttpException(error.sqlMessage, HttpStatus.NOT_ACCEPTABLE)
    };
  };
};