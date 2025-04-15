import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { Repository } from 'typeorm';
import { RequestCreateModelCartridgeDto } from './dto/RequestCreateModelCartridgeDto';
import { ResponseGetAllCartridgeModelDto } from './dto/ResponseGetAllCartridgeModelDto';
import { ResponseGetAllDetailedCartridgeModelDto } from './dto/ResponseGetAllDetailedCartridgeModelDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repoCartridgeModel: Repository<CartridgeModel>,
  ) {}

  async create(dto: RequestCreateModelCartridgeDto): Promise<SuccessResponse> {
    await this.repoCartridgeModel.save(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  async getAll(): Promise<ResponseGetAllCartridgeModelDto[]> {
    return await this.repoCartridgeModel.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  //После добавления отношения нужно будет скорректировать
  async getAllDetailed(): Promise<ResponseGetAllDetailedCartridgeModelDto[]> {
    return await this.repoCartridgeModel.find({
      select: {
        id: true,
        name: true,
        creator: {
          id: true,
          lastname: true,
          name: true,
          patronimyc: true,
        },
      },
    });
  }
}
