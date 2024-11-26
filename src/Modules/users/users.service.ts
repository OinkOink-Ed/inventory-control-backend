import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';
import { Repository } from 'typeorm';
import { CreatedResponseUserDto, CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto) {
        await this.repo.save(dto);
    };

    async findOne(nickname: string): Promise<User | undefined> {
        return this.repo.findOne(
            {
                where: {
                    nickname: `${nickname}`
                },

                select: {
                    id: true,
                    name: true,
                    nickname: true,
                    patronimyc: true,
                    surname: true,
                    role: {
                        roleName: true
                    },
                }
            }
        );
    }

    async getAll(): Promise<CreatedResponseUserDto[]> {
        return this.repo.find(
            {
                select: {
                    id: true,
                    name: true,
                    nickname: true,
                    patronimyc: true,
                    surname: true,
                    role: {
                        roleName: true
                    },
                },
                relations: ["role"],
            }
        );
    }
};