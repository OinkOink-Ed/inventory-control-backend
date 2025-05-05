import type { User } from '@Modules/user/entities/User';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToOne('User', (user: User) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  expiresAt: Date;
}
