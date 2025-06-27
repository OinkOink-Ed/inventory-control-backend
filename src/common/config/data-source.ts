import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import configuration from './configuration';

dotenv.config();
const config = configuration();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: ['src/Modules/**/*{.ts,.js}'], // Путь к сущностям не в продакшн
  migrations: ['src/migrations/**/*{.ts,.js}'], // Путь к миграциям не в продакшн
  migrationsTableName: 'migrations',
});

AppDataSource.initialize();

export default AppDataSource;
