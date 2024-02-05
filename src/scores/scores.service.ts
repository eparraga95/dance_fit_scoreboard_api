import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreParams } from './dto/create-score.dto';
import { UpdateScoreParams } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Player } from 'src/players/entities/player.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async create(player_id: number, scoreDetails: CreateScoreParams) {
    const player = await this.playerRepository.findOneBy({
      player_id: player_id,
    });

    if (!player)
      throw new HttpException(
        'User not found. Cannot create Score',
        HttpStatus.NOT_FOUND,
      );

    const { event_id } = scoreDetails;

    const event = await this.eventRepository.findOneBy({ event_id: event_id });

    if (!event)
        throw new NotFoundException("Event not Found")

    if (event.players.filter(pl => pl.nickname === player.nickname).length === 0) {
      throw new BadRequestException("Player is not a participant of selected Event")
    }

    const newScore = this.scoreRepository.create({
      ...scoreDetails,
      created_at: new Date(),
      player: player,
      event: event
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
