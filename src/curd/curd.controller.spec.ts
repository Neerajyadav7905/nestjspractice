import { Test, TestingModule } from '@nestjs/testing';
import { CurdController } from './curd.controller';
import { CurdService } from './curd.service';

describe('CurdController', () => {
  let controller: CurdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurdController],
      providers: [CurdService],
    }).compile();

    controller = module.get<CurdController>(CurdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
