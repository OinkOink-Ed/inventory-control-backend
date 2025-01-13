import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  nickname: string

  @ApiProperty()
  patronimyc: string

  @ApiProperty()
  surname: string

  @ApiProperty()
  password: string

  @ApiProperty({
    type: 'object',
    properties: {
      roleName: {
        type: 'string',
      }
    },
  })
  role: {
    roleName: string
  }
}