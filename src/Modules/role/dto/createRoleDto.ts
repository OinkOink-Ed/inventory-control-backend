import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    roleName: string
}

export class RoleWhenCreatingUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number
}

export class RoleResponsWhithUserDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    roleName: string
}