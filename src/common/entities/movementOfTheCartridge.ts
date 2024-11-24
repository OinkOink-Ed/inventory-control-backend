import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MovementOfTheCartridge {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ required: true, nullable: false })
    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false
    })
    whoAccepted_ID: number

    @ApiProperty()
    @CreateDateColumn()
    dateAccepted: Date

    @ApiProperty({ nullable: false })
    @Column({
        nullable: false
    })
    issuing_ID: number

    @ApiProperty()
    @UpdateDateColumn()
    dateOfIssue: Date;
}