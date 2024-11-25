import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    @Column()
    nickname: string

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    @Column()
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
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @Column({
        nullable: false
    })
    name: string;

    @ApiProperty()
    @IsString()
    @Column({
        nullable: false
    })
    patronimyc: string;

    @ApiProperty({
        type: () => Role,
        isArray: true
    })
    @IsString()
    @ManyToMany(() => Role, role => role.users, { cascade: true })
    @JoinTable()
    roles: Role[];

    @ApiProperty()
    @CreateDateColumn({})
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({})
    updatedAt: Date;
}