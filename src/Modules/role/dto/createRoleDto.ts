import { OmitType } from "@nestjs/swagger";
import { Role } from "src/common/entities/role";

export class CreateRoleDto extends OmitType(Role, ["roleName"]) { }