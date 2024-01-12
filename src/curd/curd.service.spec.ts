import { Test, TestingModule } from '@nestjs/testing';
import { CurdService } from './curd.service';

describe('CurdService', () => {
  let service: CurdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurdService],
    }).compile();

    service = module.get<CurdService>(CurdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
