import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
import { Phase } from 'src/phases/entities/phase.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Phase)
    private phaseRepository: Repository<Phase>,
  ) {}

  async create(player_id: number, scoreDetails: CreateScoreParams) {
    try {
      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
        relations: { events: true },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const { event_id, music_id, category_id, phase_id } = scoreDetails;

      const event = await this.eventRepository.findOne({
        where: { event_id: event_id },
        relations: {
          categories: true,
        },
      });

      if (!event) throw new NotFoundException('Event not Found');

      if (!player.events.some((e) => e.name === event.name)) {
        throw new BadRequestException(
          'Player is not a participant of selected Event',
        );
      }

      if (!event.categories.some((c) => c.category_id == category_id)) {
        throw new BadRequestException(
          'This Category is not assigned to this Event',
        );
      }

      const music = await this.musicRepository.findOne({
        where: { music_id: music_id },
      });

      if (!music) {
        throw new NotFoundException('Music not found');
      }

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

      if (!category.players.some((p) => p.nickname === player.nickname)) {
        throw new BadRequestException(
          'Player is not assigned to this Category in this Event',
        );
      }

      const phase = await this.phaseRepository.findOne({
        where: {
          phase_id: phase_id,
        },
        relations: {
          musics: true,
        },
      });

      if (!phase) {
        throw new NotFoundException('Phase not found');
      }

      if (!phase.musics.some((m) => m.music_id == music.music_id)) {
        throw new BadRequestException(
          'This Music is not assigned to this Phase',
        );
      }

      const identicalScore = await this.scoreRepository.findOne({
        where: {
          player: player,
          event: event,
          category: category,
          music: music,
          phase: phase,
        },
      });

      if (identicalScore) {
        throw new BadRequestException(
          'There can be only one instance of a Score created by a Player to a Music, inside a Category Phase of an Event',
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
        phase: phase,
      });

      return await this.scoreRepository.save(newScore);
    } catch (error) {
      console.error('Error creating score:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.scoreRepository.find({
      relations: {
        player: true,
        music: true,
        event: true,
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const score = await this.scoreRepository.findOne({
      where: { score_id: id },
      relations: {
        player: true,
        event: true,
        category: true,
        music: true,
      },
    });

    if (!score) {
      throw new NotFoundException('Score not found');
    }

    return score;
  }

  async update(score_id: number, updateScoreDetails: UpdateScoreParams) {
    try {
      const score = await this.scoreRepository.findOne({
        where: { score_id: score_id },
      });

      if (!score) {
        throw new NotFoundException('Score not found');
      }

      const updateResult = await this.scoreRepository.update(
        { score_id: score_id },
        { ...updateScoreDetails },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update score');
      }

      return await this.scoreRepository.findOne({
        where: { score_id: score_id },
      });
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const score = await this.scoreRepository.findOne({
        where: { score_id: id },
      });

      if (!score) {
        throw new NotFoundException('Score not found');
      }

      const deletionResult = await this.scoreRepository.delete(score);

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete score');
      }

      return { message: 'Score deleted successfully' };
    } catch (error) {
      console.error('Error deleting score:', error);
      throw error;
    }
  }
}
