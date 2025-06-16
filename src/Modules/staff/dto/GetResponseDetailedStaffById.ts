import { ApiProperty } from '@nestjs/swagger';

//Тут получал через queryBilder - пока не знаю как связать типизацией с сущностью
export class GetResponseDetailedStaffById {
  @ApiProperty()
  id: number;

  @ApiProperty()
  kabinet: string;

  @ApiProperty()
  division: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  count: number;
}
