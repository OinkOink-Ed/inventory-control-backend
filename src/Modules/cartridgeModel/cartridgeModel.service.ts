import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { PostCreateCartridgeModelDto } from './dto/PostCreateCartridgeModelDto';
import { GetResponseAllCartridgeModelDto } from './dto/GetResponseAllCartridgeModelDto';
import { GetResponseAllDetailedCartridgeModelDto } from './dto/GetResponseAllDetailedCartridgeModelDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repoCartridgeModel: Repository<CartridgeModel>,
  ) {}

  async create(dto: PostCreateCartridgeModelDto): Promise<SuccessResponse> {
    await this.repoCartridgeModel.save(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  async getAll(): Promise<GetResponseAllCartridgeModelDto[]> {
    const cartridgeModels = await this.repoCartridgeModel.find();

    return plainToInstance(GetResponseAllCartridgeModelDto, cartridgeModels, {
      excludeExtraneousValues: true,
    });
  }

  async getAllDetailed(): Promise<GetResponseAllDetailedCartridgeModelDto[]> {
    const cartridgeModelsDetailed = await this.repoCartridgeModel.find({
      relations: ['creator'],
    });

    return plainToInstance(
      GetResponseAllDetailedCartridgeModelDto,
      cartridgeModelsDetailed,
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
