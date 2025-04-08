import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthBase {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  access_token: string;
}