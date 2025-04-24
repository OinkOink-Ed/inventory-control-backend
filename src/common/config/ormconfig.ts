import configuration from '../config/configuration'; // Путь к твоему конфигурационному файлу
import { DataSourceOptions } from 'typeorm';

const appConfig = configuration(); // Вызываем функцию конфигурации

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql', // Укажи тип твоей базы данных (postgres, mysql, sqlite и т.д.)
  host: appConfig.database.host,
  port: appConfig.database.port,
  username: appConfig.database.user,
  password: appConfig.database.password,
  database: appConfig.database.name,
  entities: ['dist/**/*.entity{.ts,.js}'], // Путь к скомпилированным сущностям
  synchronize: true, // Не используй true в продакшене
};
