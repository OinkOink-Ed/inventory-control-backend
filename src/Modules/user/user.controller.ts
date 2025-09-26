import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { RoleGuard } from '@common/guards/RoleGuard';
import { GetResponseAllUsersByDivisionsDto } from '@Modules/user/dto/GetResponseAllUsersByDivisionsDto';
import { GetResponseAllUserDto } from '@Modules/user/dto/GetResponseAllUserDto';
import { PostCreateUserDto } from '@Modules/user/dto/PostCreateUserDto';
import { UserService } from '@Modules/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserData } from '@common/decorators/types/UserType';
import { PutEditUserDto } from './dto/PutEditUserDto';
import { CardEditGuard } from '@common/guards/CardEditGuard';
import { GetResponseUserCardDto } from './dto/GetResponseUserCardDto';
import { GetResponseAcceptedCartridgeByUserDto } from './dto/GetResponseAcceptedCartridgeByUserDto';

@Controller('users')
@UseGuards(RoleGuard)
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createUser(
    @Body() createDto: PostCreateUserDto,
    @User('sub') userData: UserData,
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.id };
    return await this.userService.createUser(createDto, userData);
  }

  @Get('/:id/can-edit')
  @Roles('admin', 'user')
  @UseGuards(CardEditGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canEditUser(@Param('id', ParseIntPipe) userId: number) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Вам доступно редактирование',
    };
  }

  @Patch('edit/:id')
  @Roles('admin', 'user')
  @UseGuards(CardEditGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async editUser(
    @Body() editDto: PutEditUserDto,
    @Param('id', ParseIntPipe) userId: number,
    @User('sub') userData: UserData,
  ): Promise<SuccessResponseDto> {
    return await this.userService.editUser(userId, editDto, userData);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllUserDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(
    @User('sub') userData: UserData,
  ): Promise<GetResponseAllUserDto[]> {
    return await this.userService.getAll(userData);
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

  @Get('card/:id')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseUserCardDto,
  })
  @ApiErrorResponses()
  async getCardUser(
    @Param('id', ParseIntPipe) staffId: number,
  ): Promise<GetResponseUserCardDto | null> {
    return await this.userService.getCardUser(staffId);
  }

  @Get('card/:id/accepted')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAcceptedCartridgeByUserDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getCardUserAcceptedCartridge(
    @Param('id', ParseIntPipe) staffId: number,
  ): Promise<GetResponseAcceptedCartridgeByUserDto[]> {
    return await this.userService.getCardUserAcceptedCartridge(staffId);
  }
}
