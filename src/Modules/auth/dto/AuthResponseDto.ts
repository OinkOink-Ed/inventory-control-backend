import { PickType } from '@nestjs/swagger';
import { AuthBaseDto } from 'src/Modules/auth/dto/AuthBaseDto';

export class AuthResponseDto extends PickType(AuthBaseDto, ['access_token']) {}
