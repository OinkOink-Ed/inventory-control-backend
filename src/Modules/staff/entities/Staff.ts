import { Base } from '@common/entities/Base';
import type { Receiving } from '@Modules/receiving/entities/Receiving';
import type { User } from '@Modules/user/entities/User';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Staff extends Base {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  patronimyc: string;

  @OneToMany('Receiving', (receiving: Receiving) => receiving.whoAccepted)
  acceptedCartridge: Receiving[];

  @ManyToOne('User', (user: User) => user.createdStaffs, {
    nullable: true,
  })
  creator: User;
}
