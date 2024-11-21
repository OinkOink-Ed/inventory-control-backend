import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({})
    createdAt: Date;

    @UpdateDateColumn({})
    updatedAt: Date;
}