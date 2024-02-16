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

  async create(createEventDetails: CreateEventParams) {
    const { name } = createEventDetails;

    const sameNameEvent = await this.eventRepository.findOne({
      where: { name: name },
    });

    if (sameNameEvent) {
      throw new BadRequestException('Same name Event already exists');
    }

    const newEvent = this.eventRepository.create({ ...createEventDetails });

    return await this.eventRepository.save(newEvent);
  }

  async addPlayer(player_id: number, event_id: number) {
    const player = await this.playerRepository.findOneBy({
      player_id: player_id,
    });

    if (!player) throw new NotFoundException('Player not found');

    const event = await this.eventRepository.findOne({
      where: {
        event_id: event_id
      },
      relations: {
        players: true
      }
    })

    if (!event) throw new NotFoundException('Event not found');

    if (
      event.players.filter((pl) => pl.nickname === player.nickname).length > 0
    ) {
      throw new BadRequestException('Player already in Event');
    }

    event.players = [...event.players, player];

    return await this.eventRepository.save(event);
  }

  async findAll() {
    return await this.eventRepository.find({
      relations: {
        categories: true,
        players: true,
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
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: number, updateEventDetails: UpdateEventParams) {
    const event = await this.eventRepository.findOne({
      where: { event_id: id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.eventRepository.update(
      { event_id: id },
      { ...updateEventDetails },
    );
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOne({
      where: { event_id: id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.eventRepository.delete({ event_id: id });
  }
}
