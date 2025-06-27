import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceDecommissioningCartridge {
  count: number;
  warehouse: { id: number };
  model: { id: number };
  state: CartridgeStatus.ISSUED;
}
