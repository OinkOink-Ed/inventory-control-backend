import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cartridge {
  @PrimaryGeneratedColumn()
  id: number;

  // Исправить через переводчик названия + почитать как через TypeORM делать тип Enum

  @Column()
  state: 'Receieving' | 'Movement' | 'Delivery' | 'Decommissioning';

  // Настроить связи там, где ID

  @Column()
  cartridgeModelsId: number;

  @Column()
  warehouseId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
