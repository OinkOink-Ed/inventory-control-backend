import { CartridgeModels } from 'src/common/entities/cartridgeModels';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cartridges {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CartridgeModels,
    (CartridgeModels) => CartridgeModels.modelName,
    { cascade: ['insert'], onDelete: 'CASCADE' },
  )
  modelName: Relation<CartridgeModels>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
