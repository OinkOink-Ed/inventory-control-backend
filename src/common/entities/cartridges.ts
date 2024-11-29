import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cartridges {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    model: string

    @Column({ nullable: false, default: true })
    availability: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}