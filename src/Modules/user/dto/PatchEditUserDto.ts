import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from "class-validator";

import { ObjectIdDto } from "@common/dto/ObjectIdDto";
import { User } from "../entities/User";

export class PatchEditUserDto {
  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  username?: User["username"];

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  name?: User["name"];

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname?: User["lastname"];

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\+7[0-9]{10}$/)
  telephone?: User["telephone"];

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc?: User["patronimyc"];

  @ApiPropertyOptional({
    type: "object",
    properties: {
      id: { type: "number" },
    },
  })
  @IsOptional()
  @Type(() => ObjectIdDto)
  @ValidateNested()
  role?: ObjectIdDto;

  @ApiPropertyOptional({
    type: "array",
    items: {
      properties: {
        id: { type: "number" },
      },
    },
  })
  @IsOptional()
  @Type(() => ObjectIdDto)
  @ValidateNested({ each: true })
  division?: ObjectIdDto[];

  @ApiPropertyOptional({
    type: "array",
    items: {
      properties: {
        id: { type: "number" },
      },
    },
  })
  @IsOptional()
  @Type(() => ObjectIdDto)
  @ValidateNested({ each: true })
  kabinets?: ObjectIdDto[];
}
