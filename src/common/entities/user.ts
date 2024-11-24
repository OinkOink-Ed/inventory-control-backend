import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    nickname: string

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    password: string

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @Column({
        nullable: false
    })
    surname: string;

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @Column({
        nullable: false
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @ApiProperty()
    @Column({
        nullable: false
    })
    @IsString()
    patronimyc: string;

    @ApiProperty()
    @Column()
    @IsString()
    role: string;

    @ApiProperty()
    @CreateDateColumn({})
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({})
    updatedAt: Date;
}