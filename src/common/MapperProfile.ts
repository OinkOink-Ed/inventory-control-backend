import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ServiceDecommissioningCartridge } from '@Modules/cartridge/service/ServiceDecommissioningCartridge';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/service/ServiceDeliveryCartridge';
import { ServiceMoveCartridge } from '@Modules/cartridge/service/ServiceMoveCartridge';
import { PostCreateDecommissioningDto } from '@Modules/decommissioning/dto/PostCreateDecommissioningDto';
import { ServiceCreateDecommissioning } from '@Modules/decommissioning/service/ServiceCreateDecommissioning';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import { ServiceCreateDelivery } from '@Modules/delivery/service/ServiceCreateDelivery';
import { PostCreateMovementDto } from '@Modules/movement/dto/PostCreateMovementDto';
import { ServiceCreateMovement } from '@Modules/movement/service/ServiceCreateMovement';
import { PostCreateReceivingDto } from '@Modules/receiving/dto/PostCreateReceivingDto';
import { ServiceCreateReceiving } from '@Modules/receiving/service/ServiceCreateReceiving';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        PostCreateReceivingDto,
        ServiceCreateReceiving,
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => ({ id: src.warehouse.id })),
        ),
        forMember(
          (dest) => dest.creator,
          mapFrom((src) => ({ id: src.creator.id })),
        ),
      );
      createMap(
        mapper,
        PostCreateMovementDto,
        ServiceCreateMovement,
        forMember(
          (dest) => dest.warehouseFrom,
          mapFrom((src) => ({ id: src.warehouseFrom.id })),
        ),
        forMember(
          (dest) => dest.warehouseWhere,
          mapFrom((src) => ({ id: src.warehouseWhere.id })),
        ),
        forMember(
          (dest) => dest.creator,
          mapFrom((src) => ({ id: src.creator.id })),
        ),
      );
      createMap(
        mapper,
        PostCreateMovementDto,
        ServiceMoveCartridge,
        forMember(
          (dest) => dest.warehouseFrom,
          mapFrom((src) => ({ id: src.warehouseFrom.id })),
        ),
        forMember(
          (dest) => dest.warehouseWhere,
          mapFrom((src) => ({ id: src.warehouseWhere.id })),
        ),
        forMember(
          (dest) => dest.model,
          mapFrom((src) => ({ id: src.model.id })),
        ),
        forMember(
          (dest) => dest.count,
          mapFrom((src) => src.count),
        ),
        forMember(
          (dest) => dest.state,
          mapFrom((src) => src.state),
        ),
      );
      createMap(
        mapper,
        PostCreateDecommissioningDto,
        ServiceCreateDecommissioning,
        forMember(
          (dest) => dest.creator,
          mapFrom((src) => ({ id: src.creator.id })),
        ),
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => ({ id: src.warehouse.id })),
        ),
        forMember(
          (dest) => dest.comment,
          mapFrom((src) => src.comment),
        ),
      );
      createMap(
        mapper,
        PostCreateDecommissioningDto,
        ServiceDecommissioningCartridge,
        forMember(
          (dest) => dest.model,
          mapFrom((src) => ({ id: src.model.id })),
        ),
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => ({ id: src.warehouse.id })),
        ),
        forMember(
          (dest) => dest.state,
          mapFrom((src) => src.state),
        ),
        forMember(
          (dest) => dest.count,
          mapFrom((src) => src.count),
        ),
      );
      createMap(
        mapper,
        PostCreateDeliveryDto,
        ServiceDeliveryCartridge,
        forMember(
          (dest) => dest.model,
          mapFrom((src) => ({ id: src.model.id })),
        ),
        forMember(
          (dest) => dest.creator,
          mapFrom((src) => ({ id: src.creator.id })),
        ),
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => ({ id: src.warehouse.id })),
        ),
        forMember(
          (dest) => dest.state,
          mapFrom((src) => src.state),
        ),
        forMember(
          (dest) => dest.count,
          mapFrom((src) => src.count),
        ),
      );
      createMap(
        mapper,
        PostCreateDeliveryDto,
        ServiceCreateDelivery,
        forMember(
          (dest) => dest.division,
          mapFrom((src) => ({ id: src.division.id })),
        ),
        forMember(
          (dest) => dest.creator,
          mapFrom((src) => ({ id: src.creator.id })),
        ),
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => ({ id: src.warehouse.id })),
        ),
        forMember(
          (dest) => dest.kabinet,
          mapFrom((src) => ({ id: src.kabinet.id })),
        ),
      );
    };
  }
}
