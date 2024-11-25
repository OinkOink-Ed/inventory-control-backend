import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class CartridgeModels {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    modelName: string

    @ApiProperty({
        type: () => User,
        isArray: true,
    })
    @ManyToOne(() => User, user => user.addedModels, { cascade: ["insert"] })
    @JoinColumn({ name: "creator_id" })
    creator: User

    @ApiProperty({
        type: () => User,
        isArray: true,
    })
    @ManyToOne(() => User, user => user.updatedModels, { cascade: ["update"] })
    @JoinColumn({ name: "updater_id" })
    updater: User

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}