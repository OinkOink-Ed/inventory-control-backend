import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceDecommissioningCartridge {
  count: number;
  warehouse: ObjectIdDto;
  model: ObjectIdDto;
  state: CartridgeStatus.ISSUED;
}
