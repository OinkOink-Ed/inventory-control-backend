import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { Repository } from 'typeorm';
import { RequestCreateModelCartridgeDto } from './dto/RequestCreateModelCartridgeDto';
import { ResponseGetAllCartridgeModelDto } from './dto/ResponseGetAllCartridgeModelDto';
import { ResponseGetAllDetailedCartridgeModelDto } from './dto/ResponseGetAllDetailedCartridgeModelDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { SelectFields } from 'types/utils';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repoCartridgeModel: Repository<CartridgeModel>,
  ) {}

  async create(
    dto: RequestCreateModelCartridgeDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    await this.repoCartridgeModel.save(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  async getAll(): Promise<
    ResponseGetAllCartridgeModelDto[] | ErrorResponseDto
  > {
    const select: SelectFields<ResponseGetAllCartridgeModelDto> = {
      id: true,
      name: true,
    };

    return await this.repoCartridgeModel.find({
      select,
    });
  }

  //После добавления отношения нужно будет скорректировать
  async getAllDetailed(): Promise<
    ResponseGetAllDetailedCartridgeModelDto[] | ErrorResponseDto
  > {
    const select: SelectFields<ResponseGetAllDetailedCartridgeModelDto> = {
      id: true,
      name: true,
      creator: {
        id: true,
        lastname: true,
        name: true,
        patronimyc: true,
      },
    };

    return await this.repoCartridgeModel.find({
      select,
      relations: ['creator'],
    });
  }
}
