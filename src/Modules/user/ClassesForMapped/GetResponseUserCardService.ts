import { ApiProperty } from '@nestjs/swagger';
import {
  Assert,
  DivisionsType,
  KabinetsType,
  RoleType,
  StrictDivisionsType,
  StrictKabinetsType,
  StrictRole,
} from '../types/GetResponseUserCardTypes';
import type { User } from '../entities/User';
import { UserStatus } from '@common/enums/UserStatus';

export class GetResponseUserCardService
  implements
    Pick<
      Assert & User,
      | 'id'
      | 'name'
      | 'lastname'
      | 'patronimyc'
      | 'username'
      | 'telephone'
      | 'state'
    >,
    DivisionsType,
    KabinetsType,
    RoleType
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  username: string;

  @ApiProperty({
    type: 'array',
    items: {
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
      required: ['name', 'id'],
    },
  })
  division: StrictDivisionsType[];

  @ApiProperty({
    type: 'array',
    items: {
      properties: {
        id: { type: 'number' },
        number: { type: 'string' },
      },
      required: ['number', 'id'],
    },
  })
  kabinets: StrictKabinetsType[];

  @ApiProperty({
    enum: UserStatus,
  })
  state: UserStatus;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      roleName: { type: 'string' },
    },
    required: ['id', 'roleName'],
  })
  role: StrictRole;
}
