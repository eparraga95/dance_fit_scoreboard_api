import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryParams } from './dto/create-category.dto';
import { UpdateCategoryParams } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { AddMusicParams } from './dto/add-music.dto';
import { Music } from 'src/musics/entities/music.entity';
import { RemoveMusicParams } from './dto/remove-music.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
  ) {}

  async create(createCategoryDetails: CreateCategoryParams) {
    const { event_id, name, level_max, level_min } = createCategoryDetails;

    const event = await this.eventRepository.findOneBy({ event_id: event_id });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const newCategory = this.categoryRepository.create({
      name: name,
      level_min: level_min,
      level_max: level_max,
      event: event,
    });

    return this.categoryRepository.save(newCategory);
  }

  async addMusic(category_id: number, addMusicDetails: AddMusicParams) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: category_id },
      relations: {
        musics: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const { music_id } = addMusicDetails;

    const music = await this.musicRepository.findOne({
      where: { music_id: music_id },
    });

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    if (music.level > category.level_max || music.level < category.level_min) {
      throw new BadRequestException(
        'This Music level is not in range with this Category accepted levels',
      );
    }

    if (category.musics.filter((m) => m.music_id == music_id).length > 0) {
      throw new BadRequestException('Music is already in this Category');
    }

    category.musics = [...category.musics, music];

    return await this.categoryRepository.save(category);
  }

  async removeMusic(
    category_id: number,
    removeMusicDetails: RemoveMusicParams,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: category_id },
      relations: {
        musics: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const { music_id } = removeMusicDetails;

    const music = await this.musicRepository.findOne({
      where: { music_id: music_id },
    });

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    category.musics = category.musics.filter((m) => m.music_id != music_id);

    return await this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({
      relations: {
        musics: true,
      },
    });
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ category_id: id });
  }

  update(id: number, updateCategoryDetails: UpdateCategoryParams) {
    return this.categoryRepository.update(
      { category_id: id },
      { ...updateCategoryDetails },
    );
  }

  remove(id: number) {
    return this.categoryRepository.delete({ category_id: id });
  }
}
