import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

@Entity()
export class Cartridge {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ required: true, nullable: false })
    @Column({
        nullable: false
    })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ required: true, nullable: false })
    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false
    })
    whoAccepted: string

    @ApiProperty()
    @CreateDateColumn()
    dateAccepted: Date

    @ApiProperty({ required: true, nullable: false, default: true })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ nullable: false, default: true })
    availability: boolean

    @ApiProperty({ nullable: false })
    @Column({
        nullable: false
    })
    issuing: string

    @ApiProperty()
    @UpdateDateColumn()
    dateOfIssue: Date;
}