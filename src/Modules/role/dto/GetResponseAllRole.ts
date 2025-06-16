import { ApiProperty } from '@nestjs/swagger';
import type { Role } from '../entities/Role';

export class GetResponseAllRole implements Pick<Role, 'id' | 'roleName'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleName: string;
}


function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);