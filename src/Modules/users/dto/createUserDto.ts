import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Role } from "src/common/entities/role";
import { User } from "src/common/entities/user";

export class CreateUserDto extends OmitType(User, ["id", "role"] as const) {
    @ApiProperty({
        type: () => OmitType(Role, ["roleName"])
    })
    role: Omit<Role, "roleName">
};

export class CreatedResponseUserDto extends OmitType(User, ["password"] as const) { };