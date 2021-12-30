import { Test, TestingModule } from '@nestjs/testing';
import { IssuerService } from './issuer.service';
import { AppModule } from '../app/app.module';

describe('IssuerService', () => {
  let service: IssuerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<IssuerService>(IssuerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
