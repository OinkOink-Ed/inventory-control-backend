import { CartridgeStatus } from '@common/enums/CartridgeStatus';

export class ServiceMoveCartridge {
  count: number;
  warehouseFrom: { id: number };
  warehouseWhere: { id: number };
  model: { id: number };
  state: CartridgeStatus.MOVED;
}
