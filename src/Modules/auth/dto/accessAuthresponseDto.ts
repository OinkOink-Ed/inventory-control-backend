import { ApiProperty } from "@nestjs/swagger"
import { UserResponseDto } from "src/Modules/users/dto/createUserDto"

export class AccessAuthResponseDto {
    @ApiProperty()
    access_token: string

    @ApiProperty({
    })
    profile: UserResponseDto
}