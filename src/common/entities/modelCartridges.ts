import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cartridges } from "./cartridges";

@Entity()
export class ModelCartridges {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        type: () => Cartridges,
        isArray: true,
    })
    @OneToMany(() => Cartridges, cartridges => cartridges.model)
    modelName: Cartridges[]

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
}