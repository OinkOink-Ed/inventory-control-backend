import type { Request } from "express";

export type UserData = {
  id: number;
  role: {
    roleName: string;
  };
};

export type AccessTokenPayload = {
  sub: UserData;
};

export type RefreshTokenPayload = {
  sub: {
    id: UserData["id"];
  };
};

export type JwtAccessPayload = AccessTokenPayload & {
  iat: number;
  exp: number;
};

export interface AuthenticatedRequest extends Request {
  user: JwtAccessPayload;
}
