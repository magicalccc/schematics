import {
  ConfigService,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../config/config.service';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { getMetadataArgsStorage } from 'typeorm';

// TODO: Implement a type and a proper config inject for dynamic ORM.

export const API_TYPEORM_POSTGRES_MODULE_CONFIG: (
  config?,
) => TypeOrmModuleAsyncOptions = () => ({
  inject: [ConfigService],
  useFactory: (conf: ConfigService) => {
    return {
      type: 'postgres',
      host: conf.getAsString(DB_HOST),
      port: conf.getAsNumeric(DB_PORT),
      username: conf.getAsString(DB_USER),
      password: conf.getAsString(DB_PASSWORD),
      database: conf.getAsString(DB_NAME),
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      dropSchema: conf.getAsBoolean('DB_AUTO_DROP_SCHEMA', {
        default: false,
      }),
      synchronize: conf.getAsBoolean('DB_SYNCHRONIZE', {
        default: true,
      }),
      logging: conf.getAsBoolean('DB_LOGGING', {
        default: false,
      })
        ? 'all'
        : false,
      bigNumberStrings: false,
      trace: true,
    };
  },
});
