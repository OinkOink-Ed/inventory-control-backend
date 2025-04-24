import Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string(),
  APP_PORT: Joi.number().port(),
  DB_USER: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
  DB_HOST: Joi.string(),
});
