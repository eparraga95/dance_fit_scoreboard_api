import { Injectable } from '@nestjs/common';
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

  create(playerDetails: CreatePlayerParams) {
    const newPlayer = this.playerRepository.create({ ...playerDetails });
    return this.playerRepository.save(newPlayer);
  }

  findAll() {
    return this.playerRepository.find();
  }

  findOne(id: number) {
    return this.playerRepository.findOneBy({ player_id: id });
  }

  update(id: number, updatePlayerDetails: UpdatePlayerParams) {
    return this.playerRepository.update(
      { player_id: id },
      { ...updatePlayerDetails },
    );
  }

  remove(id: number) {
    return this.playerRepository.delete(id);
  }
}
