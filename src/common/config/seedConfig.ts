// Путь к твоему конфигурационному файлу
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import configuration from './configuration';

dotenv.config();
const appConfig = configuration();

export const seedConfig: DataSourceOptions = {
  type: 'mysql',
  host: appConfig.database.host,
  port: appConfig.database.port,
  username: appConfig.database.user,
  password: appConfig.database.password,
  database: appConfig.database.name,
  entities: ['src/Modules/**/*{.ts,.js}'], // Путь к сущностям не в продакшн
};
