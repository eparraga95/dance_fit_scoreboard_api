import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventParams } from './dto/create-event.dto';
import { UpdateEventParams } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Player } from 'src/players/entities/player.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  create(createEventDetails: CreateEventParams) {
    const newEvent = this.eventRepository.create({ ...createEventDetails });
    return this.eventRepository.save(newEvent);
  }

  async addPlayer(player_id: number, event_id: number) {
    const player = await this.playerRepository.findOneBy({
      player_id: player_id,
    });

    if (!player) throw new NotFoundException('Player not found');

    const event = await this.eventRepository.findOneBy({ event_id: event_id });

    if (!event) throw new NotFoundException('Event not found');

    if (
      event.players.filter((pl) => pl.nickname === player.nickname).length > 0
    ) {
      throw new BadRequestException('Player already in event');
    }

    event.players = [...event.players, player];

    return await this.eventRepository.save(event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ event_id: id });
  }

  update(id: number, updateEventDetails: UpdateEventParams) {
    return this.eventRepository.update(
      { event_id: id },
      { ...updateEventDetails },
    );
  }

  remove(id: number) {
    return this.eventRepository.delete({ event_id: id });
  }
}
