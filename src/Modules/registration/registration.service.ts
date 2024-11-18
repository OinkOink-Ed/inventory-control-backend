import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto) {
        const result = await this.repo.insert(dto)

        console.log(result);

        return result
    };
};