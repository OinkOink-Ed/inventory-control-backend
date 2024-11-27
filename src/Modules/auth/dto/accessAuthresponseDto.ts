import { ApiProperty, OmitType } from "@nestjs/swagger"
import { User } from "src/common/entities/user"
import { UserResponseDto } from "src/Modules/users/dto/createUserDto"

export class AccessAuthResponseDto {
    @ApiProperty()
    access_token: string

    @ApiProperty({
    })
    profile: UserResponseDto
}