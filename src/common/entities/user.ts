import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { ApiProperty } from '@nestjs/swagger';
import { Cartridge } from './cartridge';

@Entity()
export class User extends BaseEntity {

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @Column({
        nullable: false
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @ApiProperty({ required: true, nullable: false, minLength: 4 })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @Column({
        nullable: false
    })
    surname: string;

    @ApiProperty()
    @Column()
    @IsString()
    patronimyc: string;

    // @ApiProperty({
    //     type: () => Cartridge,
    //     isArray: true,
    // })
    // @OneToMany(() => Cartridge, cartridge => cartridge)
    // cartridge: Cartridge[]
}