import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import type { User } from './User';
import type { Division } from './Division';
import type { Delivery } from './Delivery';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Kabinet extends Base {
  @Column()
  number: string;

  @OneToMany('Delivery', (delivery: Delivery) => delivery.kabinet)
  delivery: Delivery[];

  @ManyToOne('Division', (division: Division) => division.kabinet, {
    cascade: ['insert'],
  })
  division: Division;

  @ManyToOne('User', (user: User) => user.createdKabinets, {
    cascade: ['insert'],
  })
  creator: User;
}
