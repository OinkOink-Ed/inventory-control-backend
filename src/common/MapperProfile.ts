import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ServiceCreateCartridge } from 'src/Modules/cartridge/ServiceCreateCartridge';
import { PostCreateReceivingDto } from 'src/Modules/receiving/dto/PostCreateReceivingDto';
import { ServiceCreateReceiving } from 'src/Modules/receiving/classes/ServiceCreateReceiving';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, PostCreateReceivingDto, ServiceCreateReceiving);
      createMap(mapper, PostCreateReceivingDto, ServiceCreateCartridge);
    };
  }
}
