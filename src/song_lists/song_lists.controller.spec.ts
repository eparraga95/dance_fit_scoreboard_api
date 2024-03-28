import { Test, TestingModule } from '@nestjs/testing';
import { SongListsController } from './song_lists.controller';
import { SongListsService } from './song_lists.service';

describe('SongListsController', () => {
  let controller: SongListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongListsController],
      providers: [SongListsService],
    }).compile();

    controller = module.get<SongListsController>(SongListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
