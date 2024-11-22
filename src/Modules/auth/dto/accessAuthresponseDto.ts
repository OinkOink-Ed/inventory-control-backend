import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/common/entities/user"

export class AccessAuthResponseDto {
    @ApiProperty()
    access_token: string

    @ApiProperty()
    profile: User
}