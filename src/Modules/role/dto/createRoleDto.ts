import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @ApiProperty()
  @IsNotEmpty()
  creator: Creator;
}

interface Creator {
  id: number | null;
}
