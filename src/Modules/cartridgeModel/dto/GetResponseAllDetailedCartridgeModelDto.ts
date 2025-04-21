import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllDetailedCartridgeModelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: () => ({
      id: Number,
      lastname: String,
      name: String,
      patronimyc: String,
    }),
  })
  creator: { id: number; lastname: string; name: string; patronimyc: string };
}
