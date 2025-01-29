import { CartridgeModels } from 'src/common/entities/cartridgeModels';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cartridges {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartridgeModels, (CartridgeModels) => CartridgeModels.modelName, { cascade: ['insert'] })
  modelName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
