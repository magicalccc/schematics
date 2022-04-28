import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  [prop: string]: string;
}

export const NODE_ENV = 'NODE_ENV';
export const DB_NAME = 'DB_NAME';
export const DB_HOST = 'DB_HOST';
export const DB_USER = 'DB_USER';
export const DB_PORT = 'DB_PORT';
export const DB_PASSWORD = 'DB_PASSWORD';
export const MONGO_URI_PREFIX = 'MONGO_URI_PREFIX';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.config().parsed;
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision', 'staging')
        .default('development'),
      DB_NAME: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_PORT: Joi.string().optional(),
      DB_AUTO_DROP_SCHEMA: Joi.string().optional(),
      DB_SYNCHRONIZE: Joi.string().optional(),
      DB_LOGGING: Joi.string().optional(),
    });

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  getAsString(key: string): string {
    return this.envConfig[key];
  }

  getAsNumeric(key: string): number {
    return Number(this.envConfig[key]);
  }

  getAsBoolean(key: string, options: { default: boolean }): boolean {
    let result;
    try {
      result = Boolean(this.envConfig[key]);
    } catch {
      result = !!options.default;
    }

    return result;
  }
}
