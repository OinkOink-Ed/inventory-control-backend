import { CartridgeController } from '@Modules/cartridge/cartridge.controller';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { UserModule } from '@Modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridge]), UserModule],
  controllers: [CartridgeController],
  providers: [CartridgeService],
  exports: [CartridgeService],
})
export class CartridgeModule {}
