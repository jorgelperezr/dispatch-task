import { Test, TestingModule } from '@nestjs/testing';
import { Domain } from 'domain';
import { ApplicationController } from './application.controller';

describe('ApplicationController', () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [ApplicationController, Domain],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
