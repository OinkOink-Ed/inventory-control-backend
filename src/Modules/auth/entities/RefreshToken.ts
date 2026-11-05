import { User } from "@Modules/user/entities/User";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: "text" })
  declare token: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  declare user: User;

  @Column()
  declare expiresAt: Date;
}
