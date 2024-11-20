import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class CreateUserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<InsertResult> {
        return this.repo.insert(dto)
    };
};