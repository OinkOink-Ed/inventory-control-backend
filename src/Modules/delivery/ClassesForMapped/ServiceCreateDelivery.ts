import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export class ServiceCreateDelivery {
  division: { id: number };
  kabinet: { id: number };
  warehouse: { id: number };
  creator: { id: number };
  accepting: ObjectIdDto;
}
