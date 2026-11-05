import type { RefreshToken } from "../entities/RefreshToken";

export interface ServiceRefresh {
  token: string;
  user: Pick<NonNullable<RefreshToken["user"]>, "id">;
  expiresAt: Date;
}
