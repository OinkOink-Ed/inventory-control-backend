import { PickType } from '@nestjs/mapped-types';
import { RoleBaseResponse } from './RoleBaseResponse';

export class ResponseGetAllRole extends PickType(RoleBaseResponse, [
  'id',
  'roleName',
]) {}
