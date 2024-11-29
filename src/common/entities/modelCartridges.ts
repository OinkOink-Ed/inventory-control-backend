import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class CartridgeModels {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    modelName: string

    @ManyToOne(() => User, user => user.addedModels, { cascade: ["insert"] })
    @JoinColumn({ name: "creator_id" })
    creator: Relation<User>
    @ManyToOne(() => User, user => user.updatedModels, { cascade: ["update"] })
    @JoinColumn({ name: "updater_id" })
    updater: Relation<User>

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}