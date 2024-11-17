import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { UserDto } from 'src/types/User';
import { AuthGuard } from '../guards/guards';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly authorizationService: RegistrationService) { }

  @Post()
  createUser(@Body() body: UserDto) {

    return this.authorizationService.createUser(body);
  };

};