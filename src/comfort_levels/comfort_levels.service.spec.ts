import { Test, TestingModule } from '@nestjs/testing';
import { ComfortLevelsService } from './comfort_levels.service';

describe('ComfortLevelsService', () => {
  let service: ComfortLevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComfortLevelsService],
    }).compile();

    service = module.get<ComfortLevelsService>(ComfortLevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
