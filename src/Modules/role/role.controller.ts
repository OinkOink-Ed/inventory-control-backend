import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { RoleGuard } from '@common/guards/RoleGuard';
import { GetResponseAllRole } from '@Modules/role/dto/GetResponseAllRole';
import { PostCreateroleDto } from '@Modules/role/dto/PostCreateRoleDto';
import { RoleService } from '@Modules/role/role.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
@UseGuards(RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateroleDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.roleService.create(createDto);
  }

  @Roles('admin', 'user')
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseAllRole,
    isArray: true,
  })
  @ApiErrorResponses()
  async getRoles(
    @User('sub') userData: UserData,
  ): Promise<GetResponseAllRole[]> {
    return await this.roleService.getRoles(userData);
  }
}
