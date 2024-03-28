import { Test, TestingModule } from '@nestjs/testing';
import { SongListsService } from './song_lists.service';

describe('SongListsService', () => {
  let service: SongListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongListsService],
    }).compile();

    service = module.get<SongListsService>(SongListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
