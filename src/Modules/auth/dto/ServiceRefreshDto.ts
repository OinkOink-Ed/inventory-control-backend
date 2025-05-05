import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export class ServiceRefreshDto {
  token: string;
  user: ObjectIdDto;
  expiresAt: Date;
}
