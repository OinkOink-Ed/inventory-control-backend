import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceDeliveryCartridge {
  count: number;
  model: { id: number };
  warehouse: { id: number };
  state: CartridgeStatus.ISSUED;
  creator: { id: number };
}
