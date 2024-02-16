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
import { Player } from 'src/players/entities/player.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async create(createCategoryDetails: CreateCategoryParams) {
    const { event_id, name, level_max, level_min, number_of_phases } = createCategoryDetails;

    const event = await this.eventRepository.findOneBy({ event_id: event_id });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const newCategory = this.categoryRepository.create({
      name: name,
      level_min: level_min,
      level_max: level_max,
      event: event,
      number_of_phases: number_of_phases
    });

    return this.categoryRepository.save(newCategory);
  }

  // async addMusic(category_id: number, addMusicDetails: AddMusicParams) {
  //   const category = await this.categoryRepository.findOne({
  //     where: { category_id: category_id },
  //     relations: {
  //       musics: true,
  //     },
  //   });

  //   if (!category) {
  //     throw new NotFoundException('Category not found');
  //   }

  //   const { music_id } = addMusicDetails;

  //   const music = await this.musicRepository.findOne({
  //     where: { music_id: music_id },
  //   });

  //   if (!music) {
  //     throw new NotFoundException('Music not found');
  //   }

  //   if (music.level > category.level_max || music.level < category.level_min) {
  //     throw new BadRequestException(
  //       'This Music level is not in range with this Category accepted levels',
  //     );
  //   }

  //   if (category.musics.filter((m) => m.music_id == music_id).length > 0) {
  //     throw new BadRequestException('Music is already in this Category');
  //   }

  //   category.musics = [...category.musics, music];

  //   return await this.categoryRepository.save(category);
  // }

  // async removeMusic(
  //   category_id: number,
  //   removeMusicDetails: RemoveMusicParams,
  // ) {
  //   const category = await this.categoryRepository.findOne({
  //     where: { category_id: category_id },
  //     relations: {
  //       musics: true,
  //     },
  //   });

  //   if (!category) {
  //     throw new NotFoundException('Category not found');
  //   }

  //   const { music_id } = removeMusicDetails;

  //   const music = await this.musicRepository.findOne({
  //     where: { music_id: music_id },
  //   });

  //   if (!music) {
  //     throw new NotFoundException('Music not found');
  //   }

  //   if (category.musics.filter((m) => m.music_id == music_id).length === 0) {
  //     throw new BadRequestException('Music is not assigned to this Category');
  //   }

  //   category.musics = category.musics.filter((m) => m.music_id != music_id);

  //   return await this.categoryRepository.save(category);
  // }

  async findAll() {
    return await this.categoryRepository.find({
      relations: {
        players: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: {
        players: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDetails: UpdateCategoryParams) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.update(
      { category_id: id },
      {
        ...updateCategoryDetails,
      },
    );
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.delete({ category_id: id });
  }

  async addPlayer(player_id: number, category_id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        category_id: category_id,
      },
      relations: {
        players: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.players.filter((p) => p.player_id === player_id).length > 0) {
      throw new BadRequestException('Player already assigned to this Category');
    }

    const player = await this.playerRepository.findOne({
      where: {
        player_id: player_id,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    category.players = [...category.players, player];

    return await this.categoryRepository.save(category);
  }

  async removePlayer(player_id: number, category_id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        category_id: category_id,
      },
      relations: {
        players: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    console.log(category.players.filter((p) => p.player_id != player_id));

    if (category.players.filter((p) => p.player_id == player_id).length === 0) {
      throw new BadRequestException('Player is not assigned to this Category');
    }

    const player = await this.playerRepository.findOne({
      where: {
        player_id: player_id,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    category.players = category.players.filter(
      (p) => p.player_id != player.player_id,
    );

    return await this.categoryRepository.save(category);
  }
}
