import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class KabinetBaseRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @ValidateNested()
  creator: { id: number };

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @ValidateNested()
  division: { id: number };
}
