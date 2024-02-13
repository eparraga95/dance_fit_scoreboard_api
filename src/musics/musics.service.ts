import { Injectable } from '@nestjs/common';
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

  create(createMusicDto: CreateMusicDto) {
    const newMusic = this.musicRepository.create({ ...createMusicDto });
    return this.musicRepository.save(newMusic);
  }

  findAll() {
    return this.musicRepository.find();
  }

  findOne(id: number) {
    return this.musicRepository.findOneBy({ music_id: id });
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(
      {
        music_id: id,
      },
      { ...updateMusicDto },
    );
  }

  remove(id: number) {
    return this.musicRepository.delete({ music_id: id });
  }
}
