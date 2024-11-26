import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiCreatedResponse({

    })

    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: any) {
        await this.roleService.create(createDto)
    }
}
