// Путь к твоему конфигурационному файлу
import configuration from '@common/config/configuration';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const appConfig = configuration(); // Вызываем функцию конфигурации

export const seedConfig: DataSourceOptions = {
  type: 'mysql', // Укажи тип твоей базы данных (postgres, mysql, sqlite и т.д.)
  host: appConfig.database.host,
  port: appConfig.database.port,
  username: appConfig.database.user,
  password: appConfig.database.password,
  database: appConfig.database.name,
  entities: ['src/Modules/**/*{.ts,.js}'], // Путь к сущностям не в продакшн
  synchronize: false, // Не используй true в продакшене
};
