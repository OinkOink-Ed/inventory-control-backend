import { ApiProperty } from '@nestjs/swagger';

export class GetReponseAllDivisionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
