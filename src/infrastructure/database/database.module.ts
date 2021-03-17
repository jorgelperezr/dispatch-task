import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from './database.config';
import { TaskEntity } from 'src/domain/entities/task.entity';
import { PackageEntity } from 'src/domain/entities/package.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        Config.getTypeOrmConfig(configService),
    }),
    TypeOrmModule.forFeature([TaskEntity, PackageEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
