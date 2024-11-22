import { OmitType } from "@nestjs/swagger";
import { User } from "src/common/entities/user";

export class CreateUserDto extends OmitType(User, ["id"]) { };

export class CreatedResponseUserDto extends User { }