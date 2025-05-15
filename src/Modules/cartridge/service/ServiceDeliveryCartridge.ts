import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceDeliveryCartridge {
  count: number;
  model: ObjectIdDto;
  warehouse: ObjectIdDto;
  state: CartridgeStatus.ISSUED;
  creator: ObjectIdDto;
}
