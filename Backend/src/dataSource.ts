import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DBHOSTNAME,
  port: parseInt(process.env.DBPORT || '5432'),
  username: process.env.USER_NAME,
  password: String(process.env.DBPASSWORD),
  database: process.env.DBNAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/entities/**/*.{ts,js}'],
  migrations: process.env.ISDEV
    ? ['src/migrations/**/*.ts']
    : ['dist/migrations/**/*.js'],
});
