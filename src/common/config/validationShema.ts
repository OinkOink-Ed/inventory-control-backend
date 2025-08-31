import Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_ACCESS_SECRET: Joi.string().required(),
  APP_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_ROOT_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
});
