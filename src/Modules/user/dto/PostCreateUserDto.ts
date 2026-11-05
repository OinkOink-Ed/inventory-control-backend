import { UserStatus } from "@common/enums/UserStatus";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsIn,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  Assert,
  CreatorType,
  Divisiontype,
  Kabinetstype,
  RoleType,
  StrictCreator,
  StrictDivision,
  StrictKabinets,
  StrictRole,
} from "../types/PostCreateUserTypes";
import type { User } from "../entities/User";
import { Type } from "class-transformer";
import { ObjectIdDto } from "@common/dto/ObjectIdDto";
import { Role } from "@Modules/role/entities/Role";
import { Division } from "@Modules/division/entities/Division";
import { Kabinet } from "@Modules/kabinet/entities/Kabinet";

export class PostCreateUserDto {
  // implements
  //   Pick<
  //     Assert & User,
  //     | "username"
  //     | "password"
  //     | "name"
  //     | "lastname"
  //     | "patronymic"
  //     | "telephone"
  //     | "state"
  //   >,
  //   CreatorType,
  //   RoleType,
  //   Divisiontype,
  //   Kabinetstype
  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  username!: User["username"];

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(8)
  password!: User["password"];

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  name!: User["name"];

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname!: User["lastname"];

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  patronymic!: User["patronymic"];

  @ApiProperty()
  @IsString()
  @Matches(/^\+7[0-9]{10}$/)
  telephone!: User["telephone"];

  @ApiProperty({
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  role!: User["role"] & { roleName: Role["roleName"] };

  @ApiProperty({
    type: "array",
    items: {
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  })
  @Type(() => ObjectIdDto)
  @ValidateNested({ each: true })
  division!: ObjectIdDto[];

  @ApiProperty({
    type: "array",
    items: {
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  })
  @Type(() => ObjectIdDto)
  @ValidateNested({ each: true })
  kabinets!: ObjectIdDto[];

  @ApiProperty({
    enum: UserStatus,
  })
  @IsIn([UserStatus.ACTIVE])
  state!: UserStatus.ACTIVE;

  creator!: ObjectIdDto;
}
