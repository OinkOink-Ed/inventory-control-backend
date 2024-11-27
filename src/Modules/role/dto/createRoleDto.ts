import { OmitType } from "@nestjs/swagger";
import { Role } from "src/common/entities/role";

export class CreateRoleDto extends OmitType(Role, ["id"]) { }

export class RoleOfAllUsersResponseDto extends Role { }