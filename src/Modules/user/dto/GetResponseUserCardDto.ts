import { PickType } from '@nestjs/swagger';
import { GetResponseUserCardService } from '../ClassesForMapped/GetResponseUserCardService';

export class GetResponseUserCardDto extends PickType(
  GetResponseUserCardService,
  [
    'id',
    'name',
    'lastname',
    'patronimyc',
    'telephone',
    'username',
    'division',
    'kabinets',
    'role',
    'state',
  ],
) {}
