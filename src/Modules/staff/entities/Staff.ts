import { Base } from '@common/entities/Base';
import type { Delivery } from '@Modules/delivery/entities/Delivery';
import type { Movement } from '@Modules/movement/entities/Movement';
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

  @Column({ default: false })
  financiallyResponsiblePerson: boolean;

  @OneToMany('Delivery', (delivery: Delivery) => delivery.accepting)
  acceptedCartridge: Delivery[];

  @OneToMany('Movement', (movement: Movement) => movement.whoAccepted)
  acceptedMovedCartridge: Movement[];

  @ManyToOne('User', (user: User) => user.createdStaffs, {
    nullable: true,
  })
  creator: User;
}
