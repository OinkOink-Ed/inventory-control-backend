import Joi from "joi";

export interface DatabaseConfig {
    port: number;
    database: {
        host: string,
        port: number,
        user: string,
        password: string,
        name: string
    };
}

export default (): DatabaseConfig => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_DATABASE
    },
});

export const validationSchema = Joi.object({
    PORT: Joi.number().port().default(3000),
    DB_USER: Joi.string().default("root"),
    DB_PASSWORD: Joi.string().default("password1"),
    DB_DATABASE: Joi.string().default("cartridge_service"),
    DB_HOST: Joi.string().default("localhost"),
})