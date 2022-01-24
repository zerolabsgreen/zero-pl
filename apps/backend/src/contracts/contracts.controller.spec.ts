/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

describe('ContractsController', () => {
  let controller: ContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [ContractsService],
    }).compile();

    controller = module.get<ContractsController>(ContractsController);
  });


  it('should be able to create a contract', () => {});

  it('should be able to update a contract', () => {});

  it('should be able to delete a contract', () => {});
});
