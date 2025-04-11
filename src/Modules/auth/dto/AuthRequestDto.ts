import { PickType } from '@nestjs/swagger';
import { AuthBaseDto } from 'src/Modules/auth/dto/AuthBaseDto';

export class AuthRequestDto extends PickType(AuthBaseDto, [
  'username',
  'password',
]) {}
