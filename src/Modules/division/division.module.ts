import { DivisionController } from '@Modules/division/division.controller';
import { DivisionService } from '@Modules/division/division.service';
import { Division } from '@Modules/division/entities/Division';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  controllers: [DivisionController],
  providers: [DivisionService],
})
export class DivisionModule {}
