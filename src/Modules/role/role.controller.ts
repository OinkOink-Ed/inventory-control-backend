import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllRole } from '@Modules/role/dto/GetResponseAllRole';
import { PostCreateroleDto } from '@Modules/role/dto/PostCreateRoleDto';
import { RoleService } from '@Modules/role/role.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateroleDto,
  ): Promise<SuccessResponseDto> {
    return await this.roleService.create(createDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseAllRole,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetResponseAllRole[]> {
    return await this.roleService.getAll();
  }
}
