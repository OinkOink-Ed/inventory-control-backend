import { PickType } from "@nestjs/swagger";
import { AuthBase } from "src/Modules/auth/dto/AuthBase";

export class AuthResponseDto extends PickType(AuthBase, ['access_token']){}
