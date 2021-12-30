import { Test, TestingModule } from '@nestjs/testing';
import { FilecoinNodesController } from './filecoin-nodes.controller';
import { FilecoinNodesService } from './filecoin-nodes.service';

describe('FilecoinNodesController', () => {
  let controller: FilecoinNodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilecoinNodesController],
      providers: [FilecoinNodesService],
    }).compile();

    controller = module.get<FilecoinNodesController>(FilecoinNodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
