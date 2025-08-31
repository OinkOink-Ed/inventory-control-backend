import {
  Mapper,
  MappingProfile,
  autoMap,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ServiceDecommissioningCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceDecommissioningCartridge';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceDeliveryCartridge';
import { ServiceMoveCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceMoveCartridge';
import { PostCreateDecommissioningDto } from '@Modules/decommissioning/dto/PostCreateDecommissioningDto';
import { ServiceCreateDecommissioning } from '@Modules/decommissioning/ClassesForMapped/ServiceCreateDecommissioning';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import { ServiceCreateDelivery } from '@Modules/delivery/ClassesForMapped/ServiceCreateDelivery';
import { PostCreateMovementDto } from '@Modules/movement/dto/PostCreateMovementDto';
import { ServiceCreateMovement } from '@Modules/movement/ClassesForMapped/ServiceCreateMovement';
import { PostCreateReceivingDto } from '@Modules/receiving/dto/PostCreateReceivingDto';
import { ServiceCreateReceiving } from '@Modules/receiving/ClassesForMapped/ServiceCreateReceiving';
import { Injectable } from '@nestjs/common';
import { GetDeliveryByWarehouseIdService } from '@Modules/delivery/ClassesForMapped/GetDeliveryByWarehouseIdService';
import { GetDeliveryByWarehouseIdDto } from '@Modules/delivery/dto/GetDeliveryByWarehouseIdDto';
import { GetResponseStaffDetailedService } from '@Modules/user/ClassesForMapped/GetResponseStaffDetailedService';
import { GetResponseStaffDetailedDto } from '@Modules/user/dto/GetResponseStaffDetailedDto';

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
          (dest: ServiceCreateReceiving) => dest.warehouse,
          mapFrom((src: PostCreateReceivingDto) => ({ id: src.warehouse.id })),
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
          (dest: ServiceCreateMovement) => dest.warehouseFrom,
          mapFrom((src: PostCreateMovementDto) => ({
            id: src.warehouseFrom.id,
          })),
        ),
        forMember(
          (dest: ServiceCreateMovement) => dest.warehouseWhere,
          mapFrom((src: PostCreateMovementDto) => ({
            id: src.warehouseWhere.id,
          })),
        ),
        forMember(
          (dest: ServiceCreateMovement) => dest.creator,
          mapFrom((src: PostCreateMovementDto) => ({ id: src.creator.id })),
        ),
        forMember(
          (dest: ServiceCreateMovement) => dest.whoAccepted,
          mapFrom((src: PostCreateMovementDto) => ({ id: src.whoAccepted.id })),
        ),
      );
      createMap(
        mapper,
        PostCreateMovementDto,
        ServiceMoveCartridge,
        forMember(
          (dest: ServiceMoveCartridge) => dest.warehouseFrom,
          mapFrom((src: PostCreateMovementDto) => ({
            id: src.warehouseFrom.id,
          })),
        ),
        forMember(
          (dest: ServiceMoveCartridge) => dest.warehouseWhere,
          mapFrom((src: PostCreateMovementDto) => ({
            id: src.warehouseWhere.id,
          })),
        ),
        forMember(
          (dest: ServiceMoveCartridge) => dest.model,
          mapFrom((src: PostCreateMovementDto) => ({ id: src.model.id })),
        ),
        autoMap('count'),
        // forMember(
        //   (dest: ServiceMoveCartridge) => dest.count,
        //   mapFrom((src: PostCreateMovementDto) => src.count),
        // ),
        autoMap('state'),
        // forMember(
        //   (dest: ServiceMoveCartridge) => dest.state,
        //   mapFrom((src: PostCreateMovementDto) => src.state),
        // ),
      );
      createMap(
        mapper,
        PostCreateDecommissioningDto,
        ServiceCreateDecommissioning,
        forMember(
          (dest: ServiceCreateDecommissioning) => dest.creator,
          mapFrom((src: PostCreateDecommissioningDto) => ({
            id: src.creator.id,
          })),
        ),
        forMember(
          (dest: ServiceCreateDecommissioning) => dest.warehouse,
          mapFrom((src: PostCreateDecommissioningDto) => ({
            id: src.warehouse.id,
          })),
        ),
        autoMap('comment'),
        // forMember(
        //   (dest: ServiceCreateDecommissioning) => dest.comment,
        //   mapFrom((src: PostCreateDecommissioningDto) => src.comment),
        // ),
      );
      createMap(
        mapper,
        PostCreateDecommissioningDto,
        ServiceDecommissioningCartridge,
        forMember(
          (dest: ServiceDecommissioningCartridge) => dest.model,
          mapFrom((src: PostCreateDecommissioningDto) => ({
            id: src.model.id,
          })),
        ),
        forMember(
          (dest: ServiceDecommissioningCartridge) => dest.warehouse,
          mapFrom((src: PostCreateDecommissioningDto) => ({
            id: src.warehouse.id,
          })),
        ),
        // forMember(
        //   (dest: ServiceDecommissioningCartridge) => dest.state,
        //   mapFrom((src: PostCreateDecommissioningDto) => src.state),
        // ),
        autoMap('state'),
        autoMap('count'),
      );
      createMap(
        mapper,
        PostCreateDeliveryDto,
        ServiceDeliveryCartridge,
        forMember(
          (dest: ServiceDeliveryCartridge) => dest.model,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.model.id })),
        ),
        forMember(
          (dest: ServiceDeliveryCartridge) => dest.creator,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.creator.id })),
        ),
        forMember(
          (dest: ServiceDeliveryCartridge) => dest.warehouse,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.warehouse.id })),
        ),
        autoMap('state'),
        autoMap('count'),
        // forMember(
        //   (dest: ServiceDeliveryCartridge) => dest.state,
        //   mapFrom((src: PostCreateDeliveryDto) => src.state),
        // ),
        // forMember(
        //   (dest: ServiceDeliveryCartridge) => dest.count,
        //   mapFrom((src: PostCreateDeliveryDto) => src.count),
        // ),
      );
      createMap(
        mapper,
        PostCreateDeliveryDto,
        ServiceCreateDelivery,
        forMember(
          (dest: ServiceCreateDelivery) => dest.division,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.division.id })),
        ),
        forMember(
          (dest: ServiceCreateDelivery) => dest.creator,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.creator.id })),
        ),
        forMember(
          (dest: ServiceCreateDelivery) => dest.warehouse,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.warehouse.id })),
        ),
        forMember(
          (dest: ServiceCreateDelivery) => dest.kabinet,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.kabinet.id })),
        ),
        forMember(
          (dest: ServiceCreateDelivery) => dest.accepting,
          mapFrom((src: PostCreateDeliveryDto) => ({ id: src.accepting.id })),
        ),
      );
      createMap(
        mapper,
        GetDeliveryByWarehouseIdService,
        GetDeliveryByWarehouseIdDto,
        autoMap('id'),
        autoMap('accepting'),
        autoMap('creator'),
        autoMap('warehouse'),
        autoMap('division'),
        autoMap('kabinet'),
        forMember(
          (dest: GetDeliveryByWarehouseIdDto) => dest.model,
          mapFrom((src: GetDeliveryByWarehouseIdService) =>
            src.action.length > 0 ? src.action[0].cartridge.model.name : '',
          ),
        ),
        forMember(
          (dest: GetDeliveryByWarehouseIdDto) => dest.count,
          mapFrom((src: GetDeliveryByWarehouseIdService) => src.action.length),
        ),
        autoMap('createdAt'),
      );
      createMap(
        mapper,
        GetResponseStaffDetailedService,
        GetResponseStaffDetailedDto,
        autoMap('id'),
        autoMap('name'),
        autoMap('lastname'),
        autoMap('patronimyc'),
        forMember(
          (dest: GetResponseStaffDetailedDto) => dest.acceptedCartridge,
          mapFrom((src: GetResponseStaffDetailedService) =>
            src.acceptedCartridge.flatMap((item) => ({
              id: item.id,
              model: item.action[0].cartridge.model.name,
              kabinet: item.kabinet.number,
              division: item.division.name,
              count: item.action.length,
              createdAt: item.createdAt,
            })),
          ),
        ),
      );
    };
  }
}
