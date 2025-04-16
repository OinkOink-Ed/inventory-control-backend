import { PickType } from '@nestjs/mapped-types';
import { KabinetBaseResponse } from './KabinetBaseResponse';

export class ResponseGetAllKabinetDto extends PickType(KabinetBaseResponse, [
  'id',
  'number',
]) {}
