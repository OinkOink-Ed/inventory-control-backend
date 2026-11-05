import { ApiProperty } from "@nestjs/swagger";

export class DecommissioningCartridgeEventType {
  @ApiProperty()
  warehouseId!: number;
}
