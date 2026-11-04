import type { Division } from "@Modules/division/entities/Division";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserEventType {
  @ApiProperty()
  userId!: number;

  @ApiPropertyOptional({
    type: "array",
    items: {
      properties: {
        id: { type: "number" },
      },
    },
  })
  division: Pick<Division, "id">[] | undefined;
}
