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
import { AdjustComfortLevelParams } from './dto/adjust-comfort_level.dto';
import { Score } from 'src/scores/entities/score.entity';

@Injectable()
export class ComfortLevelsService {
  constructor(
    @InjectRepository(ComfortLevel)
    private comfortLevelRepository: Repository<ComfortLevel>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
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

  async findOneByEventPlayer(event_id: number, player_id: number) {
    try {
      console.log(event_id, player_id);
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

  async adjust(
    event_id: number,
    adjustComfortLevelParams: AdjustComfortLevelParams,
  ) {
    const { player_id, level_single, level_double } = adjustComfortLevelParams;

    try {
      // find the event
      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
        relations: {
          players: true
        }
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      // find the player
      const player = await this.playerRepository.findOne({
        where: {
          player_id: player_id,
        },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      // ensure player is participant of event
      if (!event.players.some(p => p.player_id == player_id)) {
        throw new BadRequestException("Player is not participant of given Event")
      }

      // find player's Comfort Level (CL)
      const comfort_level = await this.comfortLevelRepository.findOne({
        where: {
          player: player,
          event: event,
        },
      });

      if (!comfort_level) {
        throw new NotFoundException(
          'Comfort level not found for the player in this event',
        );
      }

      // find validated player event scores
      const scores = await this.scoreRepository.find({
        where: {
          player: player,
          event: event,
        },
        relations: {
          player: true,
          music: true,
        }
      })

      console.log(scores)

      // find within scores, those wich music.level are not in range with new CL + 6 for both modes, if music.mode === "double" use level_double, if music.mode === "single", use level_single
      const scoresNotInRange = scores.filter(score => {
        const musicLevel = score.music.level;
        const mode = score.music.mode;
        if (mode === "double") {
          return musicLevel < level_double || musicLevel > level_double + 6;
        } else if (mode === "single") {
          return musicLevel < level_single || musicLevel > level_single + 6;
        }
        return false;
      });

      console.log(scoresNotInRange)

      // delete scores not in range with new player's CL
      await this.scoreRepository.remove(scoresNotInRange);

      // update player's CL
      comfort_level.level_single = level_single;
      comfort_level.level_double = level_double;
      await this.comfortLevelRepository.save(comfort_level);

      return { message: 'Player Comfort Level adjusted successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while adjusting player comfort level',
      );
    }
  }
}
