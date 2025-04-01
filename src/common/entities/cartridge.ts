import {
  //   Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cartridge {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column()
  //   cartridgeModelsID

  //   @Column()
  //   statusID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
