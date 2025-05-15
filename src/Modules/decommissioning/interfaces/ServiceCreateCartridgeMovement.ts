import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export interface ServiceCreateCartridgeDecommissioning {
  comment: string;
  cartridge: ObjectIdDto;

  decommissioning: ObjectIdDto;
}
