import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSongListParams } from './dto/create-song_list.dto';
import { AddSongParams } from './dto/add-song.dto';
import { RemoveSongParams } from './dto/remove-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SongList } from './entities/song_list.entity';
import { Repository } from 'typeorm';
import { Music } from 'src/musics/entities/music.entity';
import { Event } from 'src/events/entities/event.entity';
import { Score } from 'src/scores/entities/score.entity';

@Injectable()
export class SongListsService {
  constructor(
    @InjectRepository(SongList)
    private songListRepository: Repository<SongList>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}

  async findAll() {
    return await this.songListRepository.find({
      relations: {
        event: true,
      },
    });
  }

  async findOne(id: number) {
    const songList = await this.songListRepository.findOne({
      where: {
        song_list_id: id,
      },
      relations: {
        event: true,
        musics: true
      }
    });

    if (!songList) {
      throw new NotFoundException('Song list not found')
    }

    return songList
  }

  async addSong(id: number, addSongDetails: AddSongParams) {
    try {
      const songList = await this.songListRepository.findOne({
        where: {
          song_list_id: id,
        },
        relations: {
          musics: true,
          event: true,
        },
      });

      if (!songList) {
        throw new NotFoundException('Song list not found');
      }

      const { music_id } = addSongDetails;

      const music = await this.musicRepository.findOne({
        where: {
          music_id: music_id,
        },
      });

      if (!music) {
        throw new NotFoundException('Music not found');
      }

      if (songList.musics.some((m) => m.music_id == music.music_id)) {
        throw new BadRequestException(
          'Music is already assigned to this song list',
        );
      }

      if (
        songList.musics.some(
          (m) => m.level == music.level && m.mode == music.mode,
        )
      ) {
        throw new BadRequestException(
          'A music with the same mode and level was already assigned to this song list',
        );
      }

      songList.musics.push(music);

      await this.songListRepository.save(songList);

      return songList;
    } catch (error) {
      console.error('Error adding song to song list:', error);
      throw error;
    }
  }

  async removeSong(id: number, removeSongDetails: RemoveSongParams) {
    try {
      const songList = await this.songListRepository.findOne({
        where: {
          song_list_id: id,
        },
        relations: {
          musics: true,
          event: true,
        },
      });

      if (!songList) {
        throw new NotFoundException('Song list not found');
      }

      const { music_id } = removeSongDetails;

      const music = await this.musicRepository.findOne({
        where: {
          music_id: music_id,
        },
      });

      if (!music) {
        throw new NotFoundException('Music not found');
      }

      const songIndex = songList.musics.findIndex(
        (m) => m.music_id == music_id,
      );
      if (songIndex === -1) {
        throw new BadRequestException(
          'Music is not assigned to this song list',
        );
      }

      songList.musics.splice(songIndex, 1);

      await this.songListRepository.save(songList);

      const scoresToDelete = await this.scoreRepository.find({
        where: {
          event: songList.event,
          music: music,
        },
      });

      await this.scoreRepository.remove(scoresToDelete);

      return songList;
    } catch (error) {
      console.error('Error removing music from song list', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const songList = await this.songListRepository.findOne({
        where: {
          song_list_id: id,
        },
      });

      if (!songList) {
        throw new NotFoundException('Song list not found');
      }

      const deletionResult = await this.songListRepository.delete({
        song_list_id: id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete song list');
      }

      return { message: 'Song list deleted successfully' };
    } catch (error) {
      console.error('Error deleting song list:', error);
      throw error;
    }
  }
}
