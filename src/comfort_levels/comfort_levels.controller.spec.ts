import { Test, TestingModule } from '@nestjs/testing';
import { ComfortLevelsController } from './comfort_levels.controller';
import { ComfortLevelsService } from './comfort_levels.service';

describe('ComfortLevelsController', () => {
  let controller: ComfortLevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComfortLevelsController],
      providers: [ComfortLevelsService],
    }).compile();

    controller = module.get<ComfortLevelsController>(ComfortLevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
