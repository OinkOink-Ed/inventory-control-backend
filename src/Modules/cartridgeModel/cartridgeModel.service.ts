import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { PostCreateCartridgeModelDto } from '@Modules/cartridgeModel/dto/PostCreateCartridgeModelDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllCartridgeModelDto } from '@Modules/cartridgeModel/dto/GetResponseAllCartridgeModelDto';
import { GetResponseAllDetailedCartridgeModelDto } from '@Modules/cartridgeModel/dto/GetResponseAllDetailedCartridgeModelDto';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repoCartridgeModel: Repository<CartridgeModel>,
  ) {}

  async create(dto: PostCreateCartridgeModelDto): Promise<SuccessResponseDto> {
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
