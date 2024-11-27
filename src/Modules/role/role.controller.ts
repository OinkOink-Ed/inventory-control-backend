import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateRoleDto, RoleAllResponseDto } from './dto/createRoleDto';

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

    @Get()
    @ApiCreatedResponse({
        type: RoleAllResponseDto
    })
    async getAll() {
        return await this.roleService.getAll();
    }
}
