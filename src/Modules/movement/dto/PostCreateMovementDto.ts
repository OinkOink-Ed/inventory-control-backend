import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';

export class PostCreateMovementDto {
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  model: ObjectIdDto;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouse: ObjectIdDto;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouseFrom: ObjectIdDto;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouseWhere: ObjectIdDto;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  whoAccepted: ObjectIdDto;

  creator: { id: number };
  state: CartridgeStatus.MOVED;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;
}
