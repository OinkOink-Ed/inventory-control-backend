import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/createRoleDto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiCreatedResponse({

    })

    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: CreateRoleDto) {
        await this.roleService.create(createDto)
    }
}
