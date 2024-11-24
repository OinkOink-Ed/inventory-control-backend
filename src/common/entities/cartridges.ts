import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { ModelCartridges } from "./modelCartridges";

@Entity()
export class Cartridges {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        type: () => ModelCartridges
    })
    @ManyToOne(() => ModelCartridges, modelCartridges => modelCartridges.modelName)
    model: ModelCartridges;

    @ApiProperty({ required: true, nullable: false, default: true })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ nullable: false, default: true })
    availability: boolean

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    movement_ID: number
}