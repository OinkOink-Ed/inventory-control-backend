import { ApiProperty } from '@nestjs/swagger';

export class GetReponseAllDivision {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
