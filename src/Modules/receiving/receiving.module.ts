import { Module } from '@nestjs/common';
import { ReceivingController } from './receiving.controller';
import { ReceivingService } from './receiving.service';
import { CartridgeReceiving } from 'src/common/entities/CartridgeReceiving';
import { Receiving } from 'src/common/entities/Receiving';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Receiving, CartridgeReceiving])],
  controllers: [ReceivingController],
  providers: [ReceivingService],
})
export class ReceivingModule {}
