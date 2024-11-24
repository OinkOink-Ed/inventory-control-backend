import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ModelCartridges {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    modelName: string

    @ApiProperty() s
    @CreateDateColumn()
    createdAt: Date;
}