import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MinLength } from "class-validator";

export class PatchEditProfileDto {
  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  username?: string;

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  name?: string;

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname?: string;

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\+7[0-9]{10}$/)
  telephone?: string;

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc?: string;
}
