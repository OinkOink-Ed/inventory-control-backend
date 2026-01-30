import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export class ServiceCreateDecommissioning {
  comment: string;
  warehouse: ObjectIdDto;
  creator: ObjectIdDto;
}
