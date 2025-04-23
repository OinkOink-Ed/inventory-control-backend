import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ServiceCreateCartridge } from 'src/Modules/cartridge/service/ServiceCreateCartridge';
import { PostCreateReceivingDto } from 'src/Modules/receiving/dto/PostCreateReceivingDto';
import { ServiceCreateReceiving } from 'src/Modules/receiving/service/ServiceCreateReceiving';
import { PostCreateMovementDto } from 'src/Modules/movement/dto/PostCreateMovementDto';
import { ServiceCreateMovement } from 'src/Modules/movement/service/ServiceCreateMovement';
import { ServiceMoveCartridge } from 'src/Modules/cartridge/service/ServiceMoveCartridge';
import { PostCreateDecommissioningDto } from 'src/Modules/decommissioning/dto/PostCreateDecommissioningDto';
import { ServiceCreateDecommissioning } from 'src/Modules/decommissioning/service/ServiceCreateDecommissioning';
import { ServiceDecommissioningCartridge } from 'src/Modules/cartridge/service/ServiceDecommissioningCartridge';
import { PostCreateDeliveryDto } from 'src/Modules/delivery/dto/PostCreateDeliveryDto';
import { ServiceCreateCartridgeDelivery } from 'src/Modules/delivery/service/ServiceCreateCartridgeDelivery';

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
      createMap(mapper, PostCreateDeliveryDto, ServiceCreateCartridgeDelivery);
      createMap(mapper, PostCreateDeliveryDto, ServiceMoveCartridge);
    };
  }
}
