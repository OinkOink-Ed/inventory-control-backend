import { ApiProperty } from '@nestjs/swagger';

export class ReadCartridgeModelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class ReadCartridgeModelDtoDetailed extends ReadCartridgeModelDto {
  //Нужно расширить DTO ибо это будет связанная сущность
  @ApiProperty()
  creatorid: number;
}
