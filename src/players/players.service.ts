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
import { S3Service } from 'src/aws/s3.service';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    private readonly s3Service: S3Service
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
    const players = await this.playerRepository.find({
      relations: {
        scores: { category: true, music: true, event: true },
        events: true,
      },
    });

    const safePlayers = players.map(
      ({ password, ...rest }) => rest,
    );

    return safePlayers;
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

    const { password, ...safePlayer} = player

    return safePlayer;
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

  async uploadProfilePicture(player_id: number, imageBuffer: Buffer, mimeType: string) {
    const player = await this.playerRepository.findOne({
      where: {
        player_id: player_id,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }
    
    const fileName = player.nickname + 'profilepic'

    await this.s3Service.uploadFile('dancefitscoreboardbucket', fileName, imageBuffer, mimeType)
    
    const profilePictureURL = `https://dancefitscoreboardbucket.s3.amazonaws.com/${fileName}`

    player.profilePicture = profilePictureURL

    await this.playerRepository.save(player)

    return { message: 'Profile picture uploaded successfully' };
  }
}
