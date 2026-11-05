import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  APP_PORT: Joi.number().port().default(3000),

  // DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  MYSQL_USER: Joi.string().optional(),
  MYSQL_PASSWORD: Joi.string().optional(),
  MYSQL_DATABASE: Joi.string().optional(),
  MYSQL_ROOT_PASSWORD: Joi.string().optional(),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),

  TZ: Joi.string().default("UTC"),
  CHOKIDAR_USEPOLLING: Joi.string().optional(),
});
