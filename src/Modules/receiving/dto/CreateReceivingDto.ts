import { PickType } from '@nestjs/mapped-types';
import { RequestCreateReceivingDto } from 'src/Modules/receiving/dto/ReceivingBaseRequestDto';

export class CreateReceivingDto extends PickType(RequestCreateReceivingDto, [
  'warehouse',
  'count',
  'model',
  'id',
]) {}
