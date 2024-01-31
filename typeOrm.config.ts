import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  url: process.env.postgresURL,
  entities: ['dist/src/**.entity.js'],
  migrations: ['migrations/**']
});
