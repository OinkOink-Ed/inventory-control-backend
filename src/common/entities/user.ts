import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';
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
    })
    @ManyToOne(() => Role, role => role.users)
    role: Role

    @OneToMany(() => CartridgeModels, cartridgemodels => cartridgemodels.creator)
    addedModels: Relation<CartridgeModels>[]

    @OneToMany(() => CartridgeModels, cartridgemodels => cartridgemodels.updater)
    updatedModels: Relation<CartridgeModels>[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}