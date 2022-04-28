import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import {
  ConfigService,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  MONGO_URI_PREFIX,
} from '../config/config.service';

export const API_TYPEORM_MONGO_MODULE_CONFIG: (
  config?,
) => TypeOrmModuleAsyncOptions = () => ({
  inject: [ConfigService],
  useFactory: (conf: ConfigService) => {
    const mongoUriPrefix = conf.getAsString(MONGO_URI_PREFIX) || 'mongodb';
    const mongoOptions = 'useUnifiedTopology=true&retryWrites=true';
    return {
      url: `${mongoUriPrefix}://${conf.getAsString(DB_USER)}:${conf.getAsString(
        DB_PASSWORD,
      )}@${conf.getAsString(DB_HOST)}/${conf.getAsString(
        DB_NAME,
      )}?${mongoOptions}`,
      type: 'mongodb',
      name: 'default',
      logging: false,
      synchronize: true,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      useNewUrlParser: true,
      w: 'majority',
    };
  },
});
