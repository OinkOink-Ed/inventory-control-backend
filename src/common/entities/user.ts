import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class User extends BaseEntity {
    @Column({
        nullable: false
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @Column({
        nullable: false
    })
    surname: string;

    @Column()
    @IsString()
    patronimyc: string;

    @Column({ default: true })
    isActive: boolean;
}