import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, MoreThan, Not, Repository } from 'typeorm';
import { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { PostCreateCartridgeModelDto } from '@Modules/cartridgeModel/dto/PostCreateCartridgeModelDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllCartridgeModelDto } from '@Modules/cartridgeModel/dto/GetResponseAllCartridgeModelDto';
import { GetResponseAllDetailedCartridgeModelDto } from '@Modules/cartridgeModel/dto/GetResponseAllDetailedCartridgeModelDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repoCartridgeModel: Repository<CartridgeModel>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dto: PostCreateCartridgeModelDto): Promise<SuccessResponseDto> {
    await this.repoCartridgeModel.save(dto);

    this.eventEmitter.emit('create.model.cartridge');

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  async getModels(): Promise<GetResponseAllCartridgeModelDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllCartridgeModelDto> = {
      id: true,
      name: true,
    };

    return await this.repoCartridgeModel.find({ select });
  }

  async getModelsByWarehouse(
    warehouseId: number,
  ): Promise<GetResponseAllCartridgeModelDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllCartridgeModelDto> = {
      id: true,
      name: true,
    };

    return await this.repoCartridgeModel.find({
      select,
      where: {
        cartridges: {
          warehouse: {
            id: warehouseId,
          },
          state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
        },
      },
    });
  }

  async getModelsAndTheirCreator(): Promise<
    GetResponseAllDetailedCartridgeModelDto[]
  > {
    const select: RequiredFindOptionsSelect<GetResponseAllDetailedCartridgeModelDto> =
      {
        id: true,
        name: true,
        creator: { id: true, lastname: true, name: true, patronimyc: true },
        createdAt: true,
      };

    return await this.repoCartridgeModel.find({
      relations: { creator: true },
      select,
      withDeleted: true,
    });
  }
}
