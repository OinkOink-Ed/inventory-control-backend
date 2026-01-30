import type { User } from '@Modules/user/entities/User';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  token: string;

  @ManyToOne('User', (user: User) => user.id)
  user: User;

  @Column()
  expiresAt: Date;
}
