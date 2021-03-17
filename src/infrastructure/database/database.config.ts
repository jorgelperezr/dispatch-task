import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PackageEntity } from 'src/domain/entities/package.entity';
import { TaskEntity } from 'src/domain/entities/task.entity';

class ConfigDatabaseService {
  public getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 5432),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      schema: configService.get('DB_SCHEMA'),
      entities: [TaskEntity, PackageEntity],
      synchronize: process.env.NODE_ENV === 'develop' ? true : false,
      logger: 'debug',
    };
  }
}

const Config = new ConfigDatabaseService();

export { Config };
