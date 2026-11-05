import { ApiProperty } from "@nestjs/swagger";
import type { User } from "@Modules/user/entities/User";
import {
  Assert,
  RoleType,
  StrictRole,
} from "../types/GetResponseAllUsersByDivisionsTypes";

export class GetResponseAllUsersByDivisionsDto
  implements
    Pick<User & Assert, "id" | "name" | "lastname" | "patronymic">,
    RoleType
{
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  patronymic!: string;

  @ApiProperty()
  lastname!: string;

  @ApiProperty({
    type: "object",
    properties: {
      id: { type: "number" },
      roleName: { type: "string" },
    },
    required: ["id", "roleName"],
  })
  role!: StrictRole;
}
