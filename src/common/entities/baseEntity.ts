import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    // @ApiProperty()
    @CreateDateColumn({})
    createdAt: Date;

    // @ApiProperty()
    @UpdateDateColumn({})
    updatedAt: Date;
}