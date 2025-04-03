import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  patronimyc: string;

  @Column()
  telephone: string;

  // Исправить через переводчик названия + почитать как через TypeORM делать тип Enum

  @Column()
  state: 'active' | 'noactive';

  //Везде где ID  добавить это как связь или отношение

  @Column()
  roleId: number;

  @Column()
  divisionId: number;

  @Column()
  creatorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
