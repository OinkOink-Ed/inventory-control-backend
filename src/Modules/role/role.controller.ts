import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dto/createRoleDto';
import { ReadRoleDto } from './dto/ReadRoleDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  async create(@Body() createDto: CreateRoleDto) {
    return await this.roleService.create(createDto);
  }

  @Get()
  @ApiOkResponse({
    type: () => ReadRoleDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  async getAll(): Promise<ReadRoleDto[]> {
    return await this.roleService.getAll();
  }
}
