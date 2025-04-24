import { Base } from '@common/entities/Base';
import type { Delivery } from '@Modules/delivery/entities/Delivery';
import type { Division } from '@Modules/division/entities/Division';
import type { User } from '@Modules/user/entities/User';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Kabinet extends Base {
  @Column()
  number: string;

  @OneToMany('Delivery', (delivery: Delivery) => delivery.kabinet)
  delivery: Delivery[];

  @ManyToOne('Division', (division: Division) => division.kabinet)
  division: Division;

  @ManyToOne('User', (user: User) => user.createdKabinets)
  creator: User;
}
