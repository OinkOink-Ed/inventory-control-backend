import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';
import { Repository } from 'typeorm';
import { CreatedResponsePatientDto, CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<CreatedResponsePatientDto> {
        return await this.repo.save(dto);
    };
};