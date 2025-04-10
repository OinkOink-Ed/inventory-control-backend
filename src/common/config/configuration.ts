import Joi from 'joi';

export interface DatabaseConfig {
  port: number;
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
}

export default (): DatabaseConfig => ({
  port: parseInt(process.env.APP_PORT, 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
  },
});

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string(),
  APP_PORT: Joi.number().port(),
  DB_USER: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
  DB_HOST: Joi.string(),
});
