import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScoreParams } from './dto/create-score.dto';
import { UpdateScoreParams } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Event } from 'src/events/entities/event.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(player_id: number, scoreDetails: CreateScoreParams) {
    const player = await this.playerRepository.findOneBy({
      player_id: player_id,
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const { event_id, music_id, category_id } = scoreDetails;

    const event = await this.eventRepository.findOne({
      where: { event_id: event_id },
      relations: {
        categories: true,
      },
    });

    console.log(event);

    if (!event) throw new NotFoundException('Event not Found');

    if (
      event.players.filter((pl) => pl.nickname === player.nickname).length === 0
    ) {
      throw new BadRequestException(
        'Player is not a participant of selected Event',
      );
    }

    if (
      event.categories.filter((c) => c.category_id == category_id).length === 0
    ) {
      throw new BadRequestException(
        'This Category is not assigned to this Event',
      );
    }

    const music = await this.musicRepository.findOne({
      where: { music_id: music_id },
      relations: {
        categories: true,
      },
    });

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    const category = await this.categoryRepository.findOneBy({
      category_id: category_id,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (
      music.categories.filter((c) => c.category_id == category_id).length === 0
    ) {
      throw new BadRequestException(
        'This Music is not assigned to this Category in this Event',
      );
    }

    const { value, grade, plate } = scoreDetails;

    const newScore = this.scoreRepository.create({
      value: value,
      grade: grade,
      plate: plate,
      created_at: new Date(),
      player: player,
      event: event,
      music: music,
      category: category,
    });

    return this.scoreRepository.save(newScore);
  }

  findAll() {
    return this.scoreRepository.find();
  }

  findOne(id: number) {
    return this.scoreRepository.findOneBy({ score_id: id });
  }

  update(id: number, updateScoreDetails: UpdateScoreParams) {
    return this.scoreRepository.update(
      { score_id: id },
      { ...updateScoreDetails },
    );
  }

  remove(id: number) {
    return this.scoreRepository.delete({ score_id: id });
  }
}
