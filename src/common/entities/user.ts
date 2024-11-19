import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class User extends BaseEntity {
    @Column({
        nullable: false
    })
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @Column({
        nullable: false
    })
    surname: string

    @Column()
    patronimyc: string

    @Column({ default: true })
    isActive: boolean;
}