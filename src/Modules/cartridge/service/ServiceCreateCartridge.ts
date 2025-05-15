import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceCreateCartridge {
  state: CartridgeStatus.RECEIVED;
  model: ObjectIdDto;
  warehouse: ObjectIdDto;
  count: number;
  creator: ObjectIdDto;
}
