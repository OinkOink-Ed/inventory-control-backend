import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ServiceCreateCartridgeDto } from 'src/Modules/cartridge/dto/ServiceCreateCartridgeDto';
import { CreateReceivingDto } from 'src/Modules/receiving/dto/CreateReceivingDto';
import { RequestCreateReceivingDto } from 'src/Modules/receiving/dto/ReceivingBaseRequestDto';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, RequestCreateReceivingDto, CreateReceivingDto);
      createMap(mapper, RequestCreateReceivingDto, ServiceCreateCartridgeDto);
    };
  }
}
