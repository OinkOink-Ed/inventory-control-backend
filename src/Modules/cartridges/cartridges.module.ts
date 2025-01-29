import { Module } from '@nestjs/common';
import { CartridgesController } from './cartridges.controller';
import { CartridgesService } from './cartridges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridges } from 'src/common/entities/cartridges';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridges])],
  controllers: [CartridgesController],
  providers: [CartridgesService]
})
export class CartridgesModule { }