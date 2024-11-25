import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

@Entity()
export class Cartridges {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsString()
    @Column()
    model: string

    @ApiProperty({ required: true, nullable: false, default: true })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ nullable: false, default: true })
    availability: boolean

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}