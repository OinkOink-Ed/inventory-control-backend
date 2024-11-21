import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatedResponsePatientDto, CreateUserDto } from './dto/createUserDto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('СreateUser')
@Controller('create-user')
export class UserController {
  constructor(private readonly createUserService: UserService) { }

  @Post()
  @ApiCreatedResponse({
    type: CreatedResponsePatientDto
  })
  async create(@Body() createDto: CreateUserDto): Promise<CreatedResponsePatientDto> {
    const result = await this.createUserService.create(createDto) as unknown as Promise<CreatedResponsePatientDto>;
    return result
  };
};