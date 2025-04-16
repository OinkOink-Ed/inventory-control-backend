import { PickType } from '@nestjs/mapped-types';
import { DivisionBaseResponseDto } from './DivisionBaseResponseDto';

export class ResponseGetAllDivision extends PickType(DivisionBaseResponseDto, [
  'id',
  'name',
]) {}
