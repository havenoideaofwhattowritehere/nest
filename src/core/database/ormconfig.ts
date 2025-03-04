import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3307),
  username: configService.get<string>('DB_LOGIN', 'root'),
  password: configService.get<string>('DB_PWD', 'root'),
  database: configService.get<string>('DB_NAME', 'hr_system'),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
