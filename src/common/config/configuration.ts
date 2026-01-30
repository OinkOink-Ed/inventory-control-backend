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

export default function configuration(): DatabaseConfig {
  return {
    port: parseInt(process.env.APP_PORT!, 10),
    database: {
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      user: process.env.MYSQL_USER!,
      password: process.env.MYSQL_PASSWORD!,
      name: process.env.MYSQL_DATABASE!,
    },
  };
}
