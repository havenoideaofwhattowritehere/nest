import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3307),
  username: configService.get<string>('DB_LOGIN', 'root'),
  password: configService.get<string>('DB_PWD', 'root'),
  database: configService.get<string>('DB_NAME', 'hr_system'),
  autoLoadEntities: true,
  synchronize: false,
};
