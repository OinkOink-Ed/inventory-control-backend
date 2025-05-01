import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ObjectIdDto {
  @ApiHideProperty()
  @IsNumber()
  id: number;
}
