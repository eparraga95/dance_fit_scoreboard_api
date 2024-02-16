import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePlayerParams } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerParams } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async create(playerDetails: CreatePlayerParams) {
    const { password, confirmPassword } = playerDetails;

    if (password != confirmPassword) {
      throw new BadRequestException('Passwords must match');
    }

    const newPlayer = this.playerRepository.create({
      ...playerDetails,
      role: 'player',
    });

    return await this.playerRepository.save(newPlayer);
  }

  async findAll() {
    return await this.playerRepository.find({
      relations: {
        scores: { category: true, music: true, event: true },
        events: true,
      },
    });
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOne({
      where: { player_id: id },
      relations: {
        scores: { category: true, music: true, event: true },
        events: true,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  async update(id: number, updatePlayerDetails: UpdatePlayerParams) {
    const player = this.playerRepository.findOne({ where: { player_id: id } });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return await this.playerRepository.update(
      { player_id: id },
      { ...updatePlayerDetails },
    );
  }

  async remove(id: number) {
    const player = await this.playerRepository.findOne({
      where: { player_id: id },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return await this.playerRepository.delete({ player_id: id });
  }
}
