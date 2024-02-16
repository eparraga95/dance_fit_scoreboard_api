import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music) private musicRepository: Repository<Music>,
  ) {}

  async create(createMusicDto: CreateMusicDto) {
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
  }

  async findAll() {
    return await this.musicRepository.find({
      
    });
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

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const music = await this.musicRepository.findOne({
      where: { music_id: id },
    });

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    return await this.musicRepository.update(
      {
        music_id: id,
      },
      { ...updateMusicDto },
    );
  }

  async remove(id: number) {
    const music = await this.musicRepository.findOne({
      where: { music_id: id },
    });

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    return await this.musicRepository.delete({ music_id: id });
  }
}
