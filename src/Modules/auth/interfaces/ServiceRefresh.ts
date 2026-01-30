export interface ServiceRefresh {
  token: string;
  user: { id: number };
  expiresAt: Date;
}
