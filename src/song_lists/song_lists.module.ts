import { Module } from '@nestjs/common';
import { SongListsService } from './song_lists.service';
import { SongListsController } from './song_lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongList } from './entities/song_list.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Event } from 'src/events/entities/event.entity';
import { Score } from 'src/scores/entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongList, Music, Event, Score])],
  controllers: [SongListsController],
  providers: [SongListsService],
})
export class SongListsModule {}
