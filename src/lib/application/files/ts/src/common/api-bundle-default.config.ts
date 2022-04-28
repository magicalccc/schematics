import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { API_TYPEORM_MONGO_MODULE_CONFIG } from './connections/mongo.connection';
import { API_TYPEORM_POSTGRES_MODULE_CONFIG } from './connections/postgres.connection';

// NOTE: following module could be made dynamic by injecting a bundle config.
//       this is to keep options open for switching to any ORM from resource repo.

// TODO: Implement injectable config.
export interface BazaApiBundleModulesConfig {
  TypeOrmPSQLModule: (config?) => TypeOrmModuleAsyncOptions;
  TypeOrmMongoModule: (config?) => TypeOrmModuleAsyncOptions;
}

export const defaultApiBundleModulesConfig: BazaApiBundleModulesConfig = {
  TypeOrmPSQLModule: (config?) => API_TYPEORM_POSTGRES_MODULE_CONFIG(config),
  TypeOrmMongoModule: (config?) => API_TYPEORM_MONGO_MODULE_CONFIG(config),
};
