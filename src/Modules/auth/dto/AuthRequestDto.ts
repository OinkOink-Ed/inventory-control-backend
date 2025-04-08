import { PickType } from '@nestjs/swagger';
import { AuthBase } from 'src/Modules/auth/dto/AuthBase';

export class AuthRequestDto extends PickType(AuthBase, ['username', 'password']){}
