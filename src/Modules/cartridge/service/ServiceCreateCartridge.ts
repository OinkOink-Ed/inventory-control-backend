import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceCreateCartridge {
  state: CartridgeStatus.RECEIVED;
  model: { id: number };
  warehouse: { id: number };
  count: number;
  creator: { id: number };
}
