import { RepositoryService } from './infrastructure/repository.service';
import { DomainService } from './domain/domain.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationController } from './application/controllers/application.controller';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.develop.env',
    }),
    DatabaseModule,
  ],
  controllers: [ApplicationController],
  providers: [
    {
      provide: 'I_Domain',
      useClass: DomainService,
    },
    { provide: 'I_Repository', useClass: RepositoryService },
  ],
})
export class AppModule {}
