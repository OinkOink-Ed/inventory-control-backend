import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, RoleResponsWhithUserDto } from './dto/createRoleDto';
import { ErrorResponse400, ErrorResponse403, ErrorResponse404, ErrorResponse408 } from 'src/common/errorTypes';
import { SuccessResponse200 } from 'src/common/successTypes';

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiCreatedResponse({
      type: () => SuccessResponse200
    })
    @ApiBadRequestResponse({
      type: () => ErrorResponse400
    })
    @ApiRequestTimeoutResponse({
      type: () => ErrorResponse408
    })
    @ApiForbiddenResponse({
      type: () => ErrorResponse403
    })
    @ApiNotFoundResponse({
      type: () => ErrorResponse404
    })
    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: CreateRoleDto) {
        return await this.roleService.create(createDto)
    }

    @Get()
    @ApiCreatedResponse({
      type: () => RoleResponsWhithUserDto,
      isArray: true,
    })
    @ApiBadRequestResponse({
      type: () => ErrorResponse400
    })
    @ApiRequestTimeoutResponse({
      type: () => ErrorResponse408
    })
    @ApiForbiddenResponse({
      type: () => ErrorResponse403
    })
    @ApiNotFoundResponse({
      type: () => ErrorResponse404
    })
    async getAll(): Promise<RoleResponsWhithUserDto[]> {
        return await this.roleService.getAll();
    }
}
