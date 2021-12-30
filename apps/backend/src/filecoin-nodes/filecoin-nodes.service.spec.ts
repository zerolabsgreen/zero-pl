import { Test, TestingModule } from '@nestjs/testing';
import { FilecoinNodesService } from './filecoin-nodes.service';

describe('FilecoinNodesService', () => {
  let service: FilecoinNodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilecoinNodesService],
    }).compile();

    service = module.get<FilecoinNodesService>(FilecoinNodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
