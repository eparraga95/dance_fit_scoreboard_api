import { Injectable } from '@nestjs/common';
import { CreateScoreParams } from './dto/create-score.dto';
import { UpdateScoreParams } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Player } from 'src/players/entities/player.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async create(player_id: number, scoreDetails: CreateScoreParams) {
    const player = await this.playerRepository.findOneBy({ player_id: player_id });

    if (!player)
      throw new HttpException(
        'User not found. Cannot create Score',
        HttpStatus.NOT_FOUND,
      );

    const newScore = this.scoreRepository.create({
      ...scoreDetails,
      created_at: new Date(),
      player: player,
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
