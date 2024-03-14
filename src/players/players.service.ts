import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePlayerParams } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerParams } from './dto/create-player.dto';
import { S3Service } from 'src/aws/s3.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createPlayerDetails: CreatePlayerParams) {
    try {
      const { nickname, password, confirmPassword } = createPlayerDetails;

      const existingNickname = await this.playerRepository.findOne({
        where: {
          nickname: nickname
        }
      })

      if (existingNickname) {
        throw new BadRequestException("Nickname already in use")
      }

      if (password != confirmPassword) {
        throw new BadRequestException('Passwords must match');
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newPlayer = this.playerRepository.create({
        ...createPlayerDetails,
        password: hashedPassword,
        role: 'player',
      });

      return await this.playerRepository.save(newPlayer);
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  }

  async findAll() {
    const players = await this.playerRepository.find();

    const safePlayers = players.map(({ password, ...rest }) => rest);

    return safePlayers;
  }

  async findOne(player_id: number) {
    const player = await this.playerRepository.findOne({
      where: { player_id: player_id },
      relations: {
        scores: { category: true, music: true, event: true },
        events: true,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const { password, ...safePlayer } = player;

    return safePlayer;
  }

  async update(player_id: number, updatePlayerDetails: UpdatePlayerParams) {
    try {
      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const updateResult = await this.playerRepository.update(
        { player_id: player_id },
        { ...updatePlayerDetails },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update player');
      }

      return await this.playerRepository.findOne({
        where: {
          player_id: player_id,
        },
      });
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const player = await this.playerRepository.findOne({
        where: { player_id: id },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const deletionResult = await this.playerRepository.delete({
        player_id: id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete player');
      }

      return { message: 'Player deleted succesfully' };
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  }

  async uploadProfilePicture(
    player_id: number,
    imageBuffer: Buffer,
    mimeType: string,
  ) {
    try {
      const player = await this.playerRepository.findOne({
        where: {
          player_id: player_id,
        },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      if (player.profilePicture) {
        const fileName = player.profilePicture.split('/').pop();

        await this.s3Service.deleteFile('dancefitscoreboardbucket', fileName);
      }

      const fileName = `profilepic_${player.player_id}.${mimeType.split('/')[1]}`;
      // profilepic_0.jpeg or .png

      await this.s3Service.uploadFile(
        'dancefitscoreboardbucket',
        fileName,
        imageBuffer,
        mimeType,
      );

      const profilePictureURL = `https://dancefitscoreboardbucket.s3.amazonaws.com/${fileName}`;

      player.profilePicture = profilePictureURL;
      await this.playerRepository.save(player);

      return { message: 'Profile picture uploaded successfully' };
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }
}
