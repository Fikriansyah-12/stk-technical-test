import { ConfigService, registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions=>({
      type: 'postgres',
      host: configService.get<string>("DB_HOST"),
      port: configService.get<number>("DB_PORT"),
      username: configService.get<string>("DB_USER") ?? 'postgres',
      password: configService.get<string>("DB_PASSWORD") ?? '1234567',
      database: configService.get<string>("DB_NAME") ?? 'db',
      autoLoadEntities: true,
      ssl: configService.get<string>('DB_SSL', 'false') === 'true'
    })
