import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, RoleOfAllUsersResponseDto } from './dto/createRoleDto';

@ApiTags('Role')
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
        type: () => RoleOfAllUsersResponseDto,
        isArray: true
    })
    async getAll() {
        return await this.roleService.getAll();
    }
}
