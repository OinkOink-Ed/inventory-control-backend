import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roleName: string

    @OneToMany(() => User, user => user.role)
    users: User[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}