import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { RoleGuard } from '@common/guards/RoleGuard';
import { GetResponseAllUsersByDivisionsDto } from '@Modules/user/dto/GetResponseAllUsersByDivisionsDto';
import { GetResponseStaffDetailedDto } from '@Modules/user/dto/GetResponseStaffDetailedDto';
import { GetResponseAllUserDto } from '@Modules/user/dto/GetResponseAllUserDto';
import { PostCreateAdminDto } from '@Modules/user/dto/PostCreateAdminDto';
import { PostCreateUserDto } from '@Modules/user/dto/PostCreateUserDto';
import { UserService } from '@Modules/user/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserData } from '@common/decorators/types/UserType';

@ApiTags('Users')
@Controller('users')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('admin')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createAdmin(
    @Body() createDto: PostCreateAdminDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.userService.createAdmin(createDto);
  }

  @Post('user')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createUser(
    @Body() createDto: PostCreateUserDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.userService.createUser(createDto);
  }

  @Post('staff')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createStaff(
    @Body() createDto: PostCreateUserDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.userService.createStaff(createDto);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllUserDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetResponseAllUserDto[]> {
    return await this.userService.getAll();
  }

  @Get(':warehouseId')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllUsersByDivisionsDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAllByDivisions(
    @User('sub') userData: UserData,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ): Promise<GetResponseAllUsersByDivisionsDto[]> {
    return await this.userService.getAllByDivisions(userData, warehouseId);
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseStaffDetailedDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getCardUser(
    @Param('id', ParseIntPipe) staffId: number,
  ): Promise<GetResponseStaffDetailedDto[]> {
    return await this.userService.getCardUser(staffId);
  }
}
