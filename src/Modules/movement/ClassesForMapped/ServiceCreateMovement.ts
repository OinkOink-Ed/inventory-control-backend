import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export class ServiceCreateMovement {
  warehouseFrom: { id: number };
  warehouseWhere: { id: number };
  creator: { id: number };
  whoAccepted: ObjectIdDto;
}
