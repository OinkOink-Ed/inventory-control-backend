import { Module } from '@nestjs/common';
import { CartridgesController } from './cartridges.controller';
import { CartridgesService } from './cartridges.service';

@Module({
  controllers: [CartridgesController],
  providers: [CartridgesService]
})
export class CartridgesModule {}
