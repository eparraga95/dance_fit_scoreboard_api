import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventParams } from './dto/create-event.dto';
import { UpdateEventParams } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Player } from 'src/players/entities/player.entity';
import { AdminAddPlayerParams } from './dto/adm-add-player.dto';
import { AdminRemovePlayerParams } from './dto/adm-remove-player.dto';
import { EventType } from 'src/event_types/entities/event_type.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(EventType) private eventTypeRepository: Repository<EventType>
  ) {}

  async create(createEventDetails: CreateEventParams) {
    try {
      const { name, status, event_type_id } = createEventDetails;

      if (!name) {
        throw new BadRequestException('Invalid event details');
      }

      const sameNameEvent = await this.eventRepository.findOne({
        where: { name },
      });

      if (sameNameEvent) {
        throw new BadRequestException(
          'An event with the same name already exists',
        );
      }

      const eventType = await this.eventTypeRepository.findOne({
        where: {
          event_type_id: event_type_id
        }
      })

      if (!eventType) {
        throw new NotFoundException('Event type not found')
      }

      const newEvent = this.eventRepository.create({
        name: name,
        status: status,
        event_type: eventType
      });

      return await this.eventRepository.save(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async addPlayer(player_id: number, event_id: number) {
    try {
      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });
      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
        relations: { players: true },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const playerExists = event.players.some((p) => p.player_id === player_id);
      if (playerExists) {
        throw new BadRequestException('Player already assigned to this event');
      }

      event.players.push(player);

      return await this.eventRepository.save(event);
    } catch (error) {
      console.error('Error adding player to the event:', error);
      throw error;
    }
  }

  async adminAddPlayer(
    adminAddPlayerDetails: AdminAddPlayerParams,
    event_id: number,
  ) {
    try {
      const { player_id } = adminAddPlayerDetails;

      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });
      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
        relations: { players: true },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const playerExists = event.players.some((p) => p.player_id == player_id);
      if (playerExists) {
        throw new BadRequestException('Player already assigned to this event');
      }

      event.players.push(player);

      return await this.eventRepository.save(event);
    } catch (error: any) {
      console.error('Error adding player to the event:', error);
      throw error;
    }
  }

  async removePlayer(player_id: number, event_id: number) {
    try {
      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });
      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
        relations: { players: true },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const playerIndex = event.players.findIndex(
        (p) => p.player_id == player_id,
      );
      if (playerIndex === -1) {
        throw new BadRequestException('Player not assigned to this event');
      }

      event.players.splice(playerIndex, 1);

      return await this.eventRepository.save(event);
    } catch (error) {
      console.error('Error removing player from event:', error);
      throw error;
    }
  }

  async adminRemovePlayer(
    adminRemovePlayerDetails: AdminRemovePlayerParams,
    event_id: number,
  ) {
    try {
      const { player_id } = adminRemovePlayerDetails;

      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const event = await this.eventRepository.findOne({
        where: {
          event_id: event_id,
        },
        relations: { players: true },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const playerIndex = event.players.findIndex(
        (p) => p.player_id == player_id,
      );
      if (playerIndex === -1) {
        throw new BadRequestException('Player not assigned to this event');
      }

      event.players.splice(playerIndex, 1);

      return await this.eventRepository.save(event);
    } catch (error: any) {
      console.error('Error removing player from event:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.eventRepository.find({
      relations: {
        categories: true,
        players: true,
        event_type: true
      },
    });
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({
      where: { event_id: id },
      relations: {
        players: true,
        categories: true,
        scores: true,
        event_type: true
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: number, updateEventDetails: UpdateEventParams) {
    try {
      const event = await this.eventRepository.findOne({
        where: { event_id: id },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const updateResult = await this.eventRepository.update(
        { event_id: id },
        { ...updateEventDetails },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update event');
      }

      return await this.eventRepository.findOne({
        where: {
          event_id: id,
        },
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const event = await this.eventRepository.findOne({
        where: { event_id: id },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const deletionResult = await this.eventRepository.delete({
        event_id: id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete event');
      }

      return { message: 'Event deleted successfully' };
    } catch (error) {
      console.error('Error deleting an event:', error);
      throw error;
    }
  }
}
