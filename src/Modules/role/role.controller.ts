import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, RoleResponsWhithUserDto } from './dto/createRoleDto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiCreatedResponse({
        type: null
    })

    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: CreateRoleDto) {
        await this.roleService.create(createDto)
    }

    @Get()
    @ApiCreatedResponse({
        type: () => RoleResponsWhithUserDto,
        isArray: true
    })
    async getAll() {
        return await this.roleService.getAll();
    }
}
