export class ServiceRefreshDto {
  token: string;
  user: { id: number };
  expiresAt: Date;
}
