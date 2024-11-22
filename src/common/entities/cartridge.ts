import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity"
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class Cartridge extends BaseEntity {

    @ApiProperty({ required: true, nullable: false })
    @Column({
        nullable: false
    })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false
    })
    whoAccepted: string
}