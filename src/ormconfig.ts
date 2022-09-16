import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/api/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
};
export const dataSource: DataSource = new DataSource(config);

export default config;
