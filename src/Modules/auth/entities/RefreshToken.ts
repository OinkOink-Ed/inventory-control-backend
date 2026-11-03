import type { User } from "@Modules/user/entities/User";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: "text" })
  declare token: string;

  @ManyToOne("User", (user: User) => user.id)
  declare user: User;

  @Column()
  declare expiresAt: Date;
}
