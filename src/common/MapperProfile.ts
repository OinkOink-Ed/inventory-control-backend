import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ServiceCreateCartridge } from '@Modules/cartridge/service/ServiceCreateCartridge';
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
      createMap(mapper, PostCreateReceivingDto, ServiceCreateReceiving);
      createMap(mapper, PostCreateReceivingDto, ServiceCreateCartridge);
      createMap(mapper, PostCreateMovementDto, ServiceCreateMovement);
      createMap(mapper, PostCreateMovementDto, ServiceMoveCartridge);
      createMap(
        mapper,
        PostCreateDecommissioningDto,
        ServiceCreateDecommissioning,
      );
      createMap(
        mapper,
        PostCreateDecommissioningDto,
        ServiceDecommissioningCartridge,
      );
      createMap(mapper, PostCreateDeliveryDto, ServiceDeliveryCartridge);
      createMap(mapper, PostCreateDeliveryDto, ServiceCreateDelivery);
    };
  }
}
