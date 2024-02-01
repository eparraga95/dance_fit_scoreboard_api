import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
console.log(process.env.postgresURL)

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.postgresURL,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
