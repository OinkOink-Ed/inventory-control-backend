import { Body, Injectable } from '@nestjs/common';
import { UserDto } from 'src/types/User';

@Injectable()
export class RegistrationService {

    createUser(@Body() data: UserDto): UserDto {

        console.log(data);

        return data
    };
};