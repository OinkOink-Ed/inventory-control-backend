import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { Role } from "src/common/entities/role";
import { User } from "src/common/entities/user";

export class CreateUserDto extends OmitType(User, ["id", "role"] as const) {
    @ApiProperty({
        type: () => Role
    })
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => OmitType(Role, ["roleName"] as const))
    role: Omit<Role, "roleName">
};

export class UserResponseDto extends OmitType(User, ["password"] as const) { };