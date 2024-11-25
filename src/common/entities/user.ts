import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role';
import { CartridgeModels } from './modelCartridges';

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
    @ManyToMany(() => Role, role => role.users, { cascade: true })
    @JoinTable()
    roles: Role[];

    @OneToMany(() => CartridgeModels, cartridgemodels => cartridgemodels.creator)
    addedModels: CartridgeModels[]

    @OneToMany(() => CartridgeModels, cartridgemodels => cartridgemodels.updater)
    updatedModels: CartridgeModels[]

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}