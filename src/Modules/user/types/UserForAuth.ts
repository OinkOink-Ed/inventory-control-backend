import type { Role } from "@Modules/role/entities/Role";
import type { User } from "../entities/User";

export type UserForAuth = {
  role: User["role"] & { roleName: Role["roleName"] };
};
