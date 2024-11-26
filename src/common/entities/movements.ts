import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Movements {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ required: true, nullable: false })
    @IsNotEmpty()
    @IsArray()
    cartridges: string

    @ApiProperty({ required: true, nullable: false })
    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false
    })
    whoAccepted: number

    @ApiProperty()
    @CreateDateColumn()
    dateAccepted: Date

    @ApiProperty({ nullable: false })
    @Column({
        nullable: false
    })
    issuing: number

    @ApiProperty()
    @UpdateDateColumn()
    dateOfIssue: Date;
}