import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { RefreshToken } from '@Modules/auth/entities/RefreshToken';

@Injectable()
export class TokenCleanupService {
  private readonly logger = new Logger(TokenCleanupService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Выполняется каждый день в полночь
  async cleanExpiredTokens() {
    try {
      const result = await this.refreshRepo.delete({
        expiresAt: LessThan(new Date()),
      });

      this.logger.log(`Deleted ${result.affected || 0} expired refresh tokens`);
    } catch (error) {
      this.logger.error('Error cleaning expired refresh tokens:', error);
    }
  }
}
