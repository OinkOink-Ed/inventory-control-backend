import { Body, Controller, Get, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { PostCreateStaffDto } from './dto/PostCreateStaffDto';
import { GetResponseAllStaffDto } from './dto/GetResponseAllStaffDto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createStaff(
    @Body() createDto: PostCreateStaffDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.staffService.createStaff(createDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllStaffDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetResponseAllStaffDto[]> {
    return await this.staffService.getAll();
  }
}
