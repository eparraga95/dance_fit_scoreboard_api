import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateComfortLevelDto,
  CreateComfortLevelParams,
} from './dto/create-comfort_level.dto';
import {
  UpdateComfortLevelDto,
  UpdateComfortLevelParams,
} from './dto/update-comfort_level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { ComfortLevel } from './entities/comfort_level.entity';


@Injectable()
export class ComfortLevelsService {
  constructor(
    @InjectRepository(ComfortLevel)
    private comfortLevelRepository: Repository<ComfortLevel>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async create(createComfortLevelDetails: CreateComfortLevelParams) {
    try {
      const { player_id, event_id, level_single, level_double } =
        createComfortLevelDetails;

      const player = await this.playerRepository.findOne({
        where: {
          player_id: player_id,
        },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const newComfortLevel = this.comfortLevelRepository.create({
        level_double: level_double,
        level_single: level_single,
      });

      newComfortLevel.player = player;
      newComfortLevel.event = event;

      return await this.comfortLevelRepository.save(newComfortLevel);
    } catch (error) {
      console.error('Error creating comfort level:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.comfortLevelRepository.find({
      relations: {
        event: true,
        player: true,
      },
    });
  }

  async findOne(id: number) {
    const comfortLevel = await this.comfortLevelRepository.findOne({
      where: { comfort_level_id: id },
      relations: {
        event: true,
        player: true,
      },
    });

    if (!comfortLevel) {
      throw new NotFoundException('Comfort level not found');
    }

    return comfortLevel;
  }

  async findOneByEventPlayer(
    event_id: number,
    player_id: number
  ) {
    try {

      console.log(event_id, player_id)
      const player = await this.playerRepository.findOne({
        where: {
          player_id: player_id,
        },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
        relations: {
          players: true,
        },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      if (!event.players.some((player) => player.player_id == player_id)) {
        throw new BadRequestException(
          'Player is not a participant in this event',
        );
      }

      const eventPlayerComfortLevel = await this.comfortLevelRepository.findOne(
        {
          where: {
            player: player,
            event: event,
          },
        },
      );

      if (!eventPlayerComfortLevel) {
        throw new NotFoundException(
          'Comfort level for this player in this event not found',
        );
      }

      return eventPlayerComfortLevel;
    } catch (error) {
      console.error('Error finding comfort levels', error);
      throw error;
    }
  }

  async update(
    id: number,
    updateComfortLevelDetails: UpdateComfortLevelParams,
  ) {
    try {
      const comfortLevel = await this.comfortLevelRepository.findOne({
        where: {
          comfort_level_id: id,
        },
      });

      if (!comfortLevel) {
        throw new NotFoundException('Comfort level not found');
      }

      const updateResult = await this.comfortLevelRepository.update(
        {
          comfort_level_id: id,
        },
        {
          ...updateComfortLevelDetails,
        },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException(
          'Failed to update comfort level',
        );
      }

      return await this.comfortLevelRepository.findOne({
        where: {
          comfort_level_id: id,
        },
        relations: {
          player: true,
          event: true,
        },
      });
    } catch (error) {
      console.error('Error updating comfort level:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const comfortLevel = await this.comfortLevelRepository.findOne({
        where: { comfort_level_id: id },
      });

      if (!comfortLevel) {
        throw new NotFoundException('Comfort level not found');
      }

      const deletionResult = await this.comfortLevelRepository.delete({
        comfort_level_id: id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException(
          'Failed to delete comfort level',
        );
      }

      return { message: 'Comfort level deleted successfully' };
    } catch (error) {
      console.error('Error deleting comfort level:', error);
      throw error;
    }
  }
}
