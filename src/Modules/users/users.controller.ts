import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreatedResponsePatientDto, CreateUserDto } from './dto/createUserDto';

@Controller('create-user')
export class UserController {
  constructor(private readonly createUserService: UserService) { }

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<CreatedResponsePatientDto> {
    const result = await this.createUserService.create(createDto) as unknown as Promise<CreatedResponsePatientDto>;
    return result
  };
};