import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music) private musicRepository: Repository<Music>,
  ) {}

  async create(createMusicDto: CreateMusicDto) {
    try {
      const { name, level, mode } = createMusicDto;

      const modes = ['single', 'double'];
      if (!modes.includes(mode)) {
        throw new BadRequestException('Modes can only be single or double');
      }

      const identicalMusic = await this.musicRepository.findOne({
        where: { name: name, level: level, mode: mode },
      });
      if (identicalMusic) {
        throw new BadRequestException(
          'Music with exact same data already exists',
        );
      }

      const newMusic = this.musicRepository.create({ ...createMusicDto });
      return await this.musicRepository.save(newMusic);
    } catch (error) {
      console.error('Error creating music:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.musicRepository.find();
  }

  async findOne(id: number) {
    const music = await this.musicRepository.findOne({
      where: { music_id: id },
    });

    if (!music) {
      throw new NotFoundException('Music not Found');
    }

    return music;
  }

  async update(music_id: number, updateMusicDto: UpdateMusicDto) {
    try {
      const musicToUpdate = await this.musicRepository.findOne({
        where: { music_id: music_id },
      });

      if (!musicToUpdate) {
        throw new NotFoundException('Music not found');
      }

      const potentialUpdatedMusic = this.musicRepository.create({
        ...musicToUpdate,
        ...updateMusicDto,
      });

      const potentialMusicDuplicate = await this.musicRepository.findOne({
        where: {
          name: potentialUpdatedMusic.name,
          level: potentialUpdatedMusic.level,
          mode: potentialUpdatedMusic.mode,
          music_id: Not(music_id),
        },
      });

      if (potentialMusicDuplicate) {
        throw new BadRequestException(
          'Updating would result in duplicate music',
        );
      }

      const updateResult = await this.musicRepository.update(
        {
          music_id: music_id,
        },
        { ...updateMusicDto },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update music');
      }

      return await this.musicRepository.findOne({
        where: { music_id: music_id },
      });
    } catch (error) {
      console.error('Error updating music:', error);
      throw error;
    }
  }

  async remove(music_id: number) {
    try {
      const music = await this.musicRepository.findOne({
        where: { music_id: music_id },
      });

      if (!music) {
        throw new NotFoundException('Music not found');
      }

      const deletionResult = await this.musicRepository.delete({
        music_id: music_id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete music');
      }

      return { message: 'Music deleted successfully' };
    } catch (error) {
      console.error('Error deleting music:', error);
      throw error;
    }
  }
}
