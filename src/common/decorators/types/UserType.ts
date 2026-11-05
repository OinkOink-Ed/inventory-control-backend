import type { Role } from "@Modules/role/entities/Role";
import type { User } from "@Modules/user/entities/User";
import type { Request } from "express";

export type TokenPayload = {
  sub: User["id"];
  roleName: Role["roleName"];
};

export type AccessTokenPayload = TokenPayload & {
  iat: number;
  exp: number;
};

export type RefreshTokenPayload = {
  sub: User["id"];
};

export interface AuthenticatedRequest extends Request {
  user: TokenPayload;
}
