import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) { }

  @Post()
  create(@Body() createDto: CreateUserDto) {

    return this.registrationService.create(createDto);
  };

};