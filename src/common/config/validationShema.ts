import Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  APP_PORT: Joi.number().port().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_USER_HOST: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
  TZ: Joi.string().required(),
  CHOKIDAR_USEPOLLING: Joi.string().required(),
});
