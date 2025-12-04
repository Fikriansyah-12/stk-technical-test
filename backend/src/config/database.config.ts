import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') ?? 'db',
  port: Number(configService.get<string>('DB_PORT') ?? 5432),
  username: configService.get<string>('DB_USER') ?? 'postgres',
  password: configService.get<string>('DB_PASSWORD') ?? 'postgres',
  database: configService.get<string>('DB_NAME') ?? 'menus_db',

  autoLoadEntities: true,
  synchronize: true,
});
