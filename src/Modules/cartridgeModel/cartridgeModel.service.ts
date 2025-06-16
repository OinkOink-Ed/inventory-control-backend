import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return await this.repoCartridgeModel.find();
  }

  async getAllDetailed(): Promise<GetResponseAllDetailedCartridgeModelDto[]> {
    return await this.repoCartridgeModel.find({
      relations: { creator: true },
      withDeleted: true,
    });
  }
}
