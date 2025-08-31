import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { KabinetController } from '@Modules/kabinet/kabinet.controller';
import { KabinetService } from '@Modules/kabinet/kabinet.service';
import { UserModule } from '@Modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kabinet]), UserModule],
  controllers: [KabinetController],
  providers: [KabinetService],
})
export class KabinetModule {}
